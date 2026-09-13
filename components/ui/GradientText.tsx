import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  /** Gradient direction/style */
  variant?: "accent" | "warm" | "cool" | "custom";
  /** Custom gradient (CSS string), used when variant="custom" */
  gradient?: string;
  as?: React.ElementType;
}

const gradientMap = {
  accent: "linear-gradient(135deg, #4a7cff 0%, #a78bfa 100%)",
  warm:   "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)",
  cool:   "linear-gradient(135deg, #2dd4bf 0%, #4a7cff 80%)",
  custom: "",
};

/**
 * GradientText — renders text with a gradient fill.
 * Supports predefined variants or custom CSS gradient strings.
 */
export function GradientText({
  children,
  className = "",
  variant = "accent",
  gradient,
  as: Tag = "span",
}: GradientTextProps) {
  const grad = variant === "custom" && gradient ? gradient : gradientMap[variant];

  return (
    <Tag
      className={className}
      style={{
        background: grad,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        display: "inline",
      }}
    >
      {children}
    </Tag>
  );
}
