type Recaptcha = { ready: (callback: () => void) => void; execute: (key: string, options: { action: string }) => Promise<string> };
declare global { interface Window { grecaptcha?: Recaptcha } }

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
let scriptPromise: Promise<void> | undefined;

function load() {
  if (!siteKey) return Promise.reject(new Error("Verification is unavailable. Please try again later."));
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      const timeout = setTimeout(() => { script.remove(); reject(new Error("Verification could not load. Please retry.")); }, 15000);
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.onload = () => {
        if (!window.grecaptcha) { clearTimeout(timeout); script.remove(); reject(new Error("Verification could not load. Please retry.")); return; }
        window.grecaptcha.ready(() => { clearTimeout(timeout); resolve(); });
      };
      script.onerror = () => { clearTimeout(timeout); script.remove(); reject(new Error("Verification could not load. Please retry.")); };
      document.head.appendChild(script);
    }).catch((error) => { scriptPromise = undefined; throw error; });
  }
  return scriptPromise;
}

export async function registrationToken(): Promise<string> {
  await load();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Verification timed out. Please retry.")), 15000);
    window.grecaptcha!.execute(siteKey, { action: "register" }).then((token) => {
      clearTimeout(timer);
      if (token) resolve(token); else reject(new Error("Verification failed. Please retry."));
    }, () => { clearTimeout(timer); reject(new Error("Verification failed. Please retry.")); });
  });
}
