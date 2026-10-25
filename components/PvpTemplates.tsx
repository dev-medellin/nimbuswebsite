import Image from "next/image";
import type { ReactNode } from "react";
import Navigation from "./Navigation";
import { PageIntro, SiteShell } from "./SiteShell";

type PvpPageTemplateProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  width?: "narrow" | "standard" | "wide";
  bodyClassName?: string;
};

const widths = {
  narrow: "max-w-3xl",
  standard: "max-w-6xl",
  wide: "max-w-7xl",
};

export function PvpPageTemplate({
  eyebrow,
  title,
  description,
  children,
  width = "standard",
  bodyClassName = "",
}: PvpPageTemplateProps) {
  return (
    <SiteShell>
      <PageIntro eyebrow={eyebrow} title={title}>{description}</PageIntro>
      {children && (
        <main className={`pvp-page-body ${bodyClassName}`}>
          <div className={`pvp-page-container ${widths[width]}`}>{children}</div>
        </main>
      )}
    </SiteShell>
  );
}

type PvpSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
};

export function PvpSectionHeading({ eyebrow, title, description, icon, action }: PvpSectionHeadingProps) {
  return (
    <header className="pvp-section-heading">
      <div className="pvp-section-heading-main">
        {icon && <span className="pvp-section-heading-icon">{icon}</span>}
        <div>
          <p>{eyebrow}</p>
          <h2>{title}</h2>
          {description && <span>{description}</span>}
        </div>
      </div>
      {action && <div className="pvp-section-heading-action">{action}</div>}
    </header>
  );
}

type PvpAuthTemplateProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
  formSide?: "left" | "right";
  footerNote?: ReactNode;
};

export function PvpAuthTemplate({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
  children,
  formSide = "right",
  footerNote,
}: PvpAuthTemplateProps) {
  const copy = (
    <div className="pvp-auth-copy">
      <p>{eyebrow}</p>
      <h1>{title}<span>{accent}</span></h1>
      <div className="pvp-auth-rule"><i /><b>PLAYER ACCESS</b><i /></div>
      <p className="pvp-auth-description">{description}</p>
      <div className="pvp-auth-character">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 85vw, 430px" className="object-contain object-bottom" />
      </div>
      {footerNote && <div className="pvp-auth-note">{footerNote}</div>}
    </div>
  );

  const form = <section className="pvp-auth-form"><div className="pvp-auth-form-inner">{children}</div></section>;

  return (
    <div className="pvp-auth-page min-h-screen">
      <Navigation />
      <main className="pvp-auth-template">
        <div className={`pvp-auth-grid ${formSide === "left" ? "form-left" : "form-right"}`}>
          {formSide === "left" ? <>{form}{copy}</> : <>{copy}{form}</>}
        </div>
      </main>
    </div>
  );
}
