const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

export function isAuthenticated() {
  return typeof window !== "undefined" && Boolean(window.localStorage.getItem("authToken"));
}

type ApiResponse = {
  message?: string;
  token?: string;
  user?: Record<string, unknown>;
  errors?: Record<string, string[]>;
};

export type AccountProfile = ApiResponse & {
  username?: string;
  email?: string;
  name?: string | null;
  level?: number;
  job?: string;
  guild?: string;
  cps?: number;
  gold?: number;
  online?: boolean;
};

async function request<T extends ApiResponse>(path: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({})) as T;
  if (!response.ok) {
    const validationMessage = payload.errors
      ? Object.values(payload.errors).flat()[0]
      : undefined;
    throw new Error(validationMessage || payload.message || "The realm could not complete that request.");
  }
  return payload;
}

async function authorizedRequest<T extends ApiResponse>(path: string, body: Record<string, unknown> = {}, method = "POST"): Promise<T> {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null;
  if (!token) throw new Error("Please log in to manage your account.");
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
    ...(method === "GET" ? {} : { body: JSON.stringify(body) }),
  });
  const payload = await response.json().catch(() => ({})) as T;
  if (!response.ok) {
    const validationMessage = payload.errors ? Object.values(payload.errors).flat()[0] : undefined;
    throw new Error(validationMessage || payload.message || "The account request could not be completed.");
  }
  return payload;
}

export function getAccount() {
  return authorizedRequest<AccountProfile>("/account", {}, "GET");
}

export function changeEmail(email: string) {
  return authorizedRequest("/account/change-email", { email });
}

export function changePassword(currentPassword: string, newPassword: string) {
  return authorizedRequest("/account/change-password", { currentPassword, newPassword });
}

export function loginUser(username: string, password: string) {
  return request("/login", { username, password }).then((result) => {
    if (result.token && typeof window !== "undefined") window.localStorage.setItem("authToken", result.token);
    return result;
  });
}

export async function logoutUser() {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("authToken") : null;
  if (!token) return;

  try {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
  } finally {
    if (typeof window !== "undefined") window.localStorage.removeItem("authToken");
  }
}

export function registerUser(username: string, email: string, password: string, agreeTerms: boolean, recaptchaTicket: string) {
  return request("/register", {
    username,
    email,
    password,
    confirmPassword: password,
    agreeTerms,
    recaptchaTicket,
  }).then((result) => {
    if (result.token && typeof window !== "undefined") window.localStorage.setItem("authToken", result.token);
    return result;
  });
}

export type PaypalCheckoutResponse = ApiResponse & {
  payment?: {
    referenceNo?: string;
    providerReferenceNo?: string;
    amount?: number;
    currency?: string;
    status?: string;
    approvalUrl?: string;
  };
};

export function createPaypalCheckout(items: Array<{ itemId: number; quantity: number }>) {
  return authorizedRequest<PaypalCheckoutResponse>("/shop/checkout", {
    items,
    paymentProvider: "paypal",
  });
}

export async function completePaypalReturn(referenceNo: string, token: string) {
  const response = await fetch(`${API_URL}/paypal/return/${encodeURIComponent(referenceNo)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ token }),
  });
  const payload = await response.json().catch(() => ({})) as PaypalCheckoutResponse;
  if (!response.ok) throw new Error(payload.message || "PayPal could not complete this payment.");
  return payload;
}
