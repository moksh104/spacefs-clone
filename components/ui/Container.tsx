import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

/**
 * Container — centres content with max-width and responsive horizontal padding.
 * Adapts across all breakpoints: 320px → 1920px.
 */
export function Container({
  children,
  className = "",
  as: Tag = "div",
  style,
}: ContainerProps) {
  return (
    <Tag
      className={`container-site ${className}`}
      style={{
        width: "100%",
        maxWidth: "var(--space-container-max)",
        marginInline: "auto",
        paddingInline: "var(--space-container-px)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
