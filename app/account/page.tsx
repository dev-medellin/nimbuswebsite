"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { changeEmail, changePassword, getAccount, isAuthenticated, type AccountProfile } from "../../lib/api";
import { PageIntro, SiteShell } from "../../components/SiteShell";

export default function AccountPage() {
  const router = useRouter();
  const [account, setAccount] = useState<AccountProfile | null>(null);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    getAccount().then((profile) => {
      setAccount(profile);
      setEmail(profile.email || "");
    }).catch(() => router.replace("/login"));
  }, [router]);

  const saveEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingEmail(true);
    setEmailMessage("");
    try {
      await changeEmail(email);
      setAccount((current) => current ? { ...current, email } : current);
      setEmailMessage("Email address updated successfully.");
    } catch (error) {
      setEmailMessage(error instanceof Error ? error.message : "Unable to update email address.");
    } finally {
      setSavingEmail(false);
    }
  };

  const savePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingPassword(true);
    setPasswordMessage("");
    if (newPassword.length < 6 || newPassword.length > 16) {
      setPasswordMessage("New password must be between 6 and 16 characters.");
      setSavingPassword(false);
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setPasswordMessage("Password updated successfully.");
    } catch (error) {
      setPasswordMessage(error instanceof Error ? error.message : "Unable to update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (!account) return <SiteShell><PageIntro eyebrow="Player dashboard" title="Loading account panel..." /></SiteShell>;

  const field = "mt-2 w-full border-2 border-[#b28a4e] bg-[#fff8e6] px-4 py-3 text-[#263652] outline-none focus:border-[#8a342e]";
  return <SiteShell>
    <div className="account-page events-page">
      <PageIntro eyebrow="Player dashboard" title={`Welcome back, ${account.name || account.username || "adventurer"}.`} />
      <main className="account-content">
        <div className="account-heading"><p>ACCOUNT COMMAND CENTER</p><h2>Your realm profile</h2><span>Manage your identity, character details, and security.</span></div>
        <section className="account-summary-grid">
          <article className="account-frame"><p className="account-label">ACCOUNT STATUS</p><h3>{account.username}</h3><p>{account.email || "No email address set"}</p><span className={`account-presence ${account.online ? "online" : "offline"}`}><i />{account.online ? "Online in the realm" : "Offline"}</span></article>
          <article className="account-frame"><p className="account-label">CHARACTER</p><h3>{account.name || "No character yet"}</h3><p>{account.job || "Unknown class"} · Level {account.level || 0}</p><p>{account.guild || "No Guild"}</p><div className="account-stats"><span><b>{(account.cps || 0).toLocaleString()}</b> CPs</span><span><b>{(account.gold || 0).toLocaleString()}</b> silver</span></div></article>
        </section>
        <section className="account-tools"><div className="account-section-title"><p>SECURITY AND PROFILE</p><h2>Keep your account ready</h2></div><div className="account-tool-grid">
          <article className="account-frame account-tool"><p className="account-label">CHANGE EMAIL</p><h3>Contact address</h3><form onSubmit={saveEmail}><label>Email address<input className={field} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><button className="account-button" disabled={savingEmail} type="submit">{savingEmail ? "Saving..." : "Update email"}</button>{emailMessage && <p className="account-message" role="status">{emailMessage}</p>}</form></article>
          <article className="account-frame account-tool"><p className="account-label">CHANGE PASSWORD</p><h3>Security key</h3><form onSubmit={savePassword}><label>Current password<input className={field} type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></label><label>New password<input className={field} type="password" minLength={6} maxLength={16} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required /></label><button className="account-button" disabled={savingPassword} type="submit">{savingPassword ? "Saving..." : "Update password"}</button>{passwordMessage && <p className="account-message" role="status">{passwordMessage}</p>}</form></article>
        </div></section>
        <div className="account-download"><Link className="account-button" href="/download">Download client <span>→</span></Link></div>
      </main>
    </div>
  </SiteShell>;
}
