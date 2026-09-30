"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ScanLine,
  Terminal,
  ChartNoAxesCombined,
  Sparkles,
  Bell,
  Network,
  Users,
  Package,
  Mic,
  Workflow,
  ArrowUpRight,
} from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
const icons = {
  Activity,
  ScanLine,
  Terminal,
  ChartNoAxesCombined,
  Sparkles,
  Bell,
  Network,
  Users,
  Package,
  Mic,
  Workflow,
};
export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const Component = icons[name as keyof typeof icons] || Activity;
  return <Component size={size} aria-hidden="true" />;
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { opacity: [0.8, 1], y: [12, 0] }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="page-intro container">
      <div className="breadcrumb">
        <Link href="/">Projeto</Link>
        <span>/</span>
        {eyebrow}
      </div>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
export function FeatureCards({ items }: { items: string[][] }) {
  return (
    <div className="feature-grid">
      {items.map(([title, text, icon], i) => (
        <Reveal className="feature-card" key={title}>
          <div className="feature-top">
            <Icon name={icon} />
            <span>/{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>
      ))}
    </div>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
