import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center rounded-md px-5 py-3 font-display text-sm font-medium uppercase tracking-wide transition-[color,background-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants = {
  light:
    "border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
  dark:
    "border border-zinc-900/10 bg-zinc-950/80 text-white hover:bg-zinc-950/90 hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]",
} as const;

type Variant = keyof typeof variants;

type TetrisLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function TetrisLink({
  className = "",
  variant = "light",
  ...props
}: TetrisLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

type TetrisButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function TetrisButton({
  className = "",
  type = "button",
  variant = "dark",
  ...props
}: TetrisButtonProps) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
