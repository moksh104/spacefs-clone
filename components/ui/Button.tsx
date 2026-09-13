import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  /** Renders as an anchor element when href is provided */
  href?: string;
  /** Open link in new tab */
  external?: boolean;
  /** Icon on the left */
  iconLeft?: React.ReactNode;
  /** Icon on the right */
  iconRight?: React.ReactNode;
  /** Full-width button */
  fullWidth?: boolean;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

const variantMap: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

/**
 * Button — accessible, animated button/link component.
 * Supports primary, secondary, and ghost variants with size options.
 * Automatically renders as `<a>` when `href` is provided.
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  external = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    variantMap[variant],
    sizeMap[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label={
          external && typeof children === "string"
            ? `${children} (opens in new tab)`
            : undefined
        }
      >
        {iconLeft && <span aria-hidden="true">{iconLeft}</span>}
        {children}
        {iconRight && <span aria-hidden="true">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {iconLeft && <span aria-hidden="true">{iconLeft}</span>}
      {children}
      {iconRight && <span aria-hidden="true">{iconRight}</span>}
    </button>
  );
}
