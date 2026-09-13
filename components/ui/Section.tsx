import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  /** Controls top/bottom padding size */
  size?: "sm" | "md" | "lg";
  /** Dark background variant */
  dark?: boolean;
  /** Light background variant */
  light?: boolean;
}

/**
 * Section — wrapper with consistent vertical padding and optional background.
 * Use `id` for anchor navigation.
 */
export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
  size = "md",
  dark = false,
  light = false,
}: SectionProps) {
  const paddingClass =
    size === "sm"
      ? "section-py-sm"
      : size === "lg"
      ? "section-py-lg"
      : "section-py";

  const bgClass = dark
    ? "bg-dark"
    : light
    ? "bg-light"
    : "";

  return (
    <Tag
      id={id}
      className={`relative overflow-hidden ${paddingClass} ${bgClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
