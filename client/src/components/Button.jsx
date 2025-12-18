import React from "react";

const VARIANT_CLASSES = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
};

const SIZE_CLASSES = {
  sm: "text-sm px-2 py-1",
  md: "text-sm px-3 py-2",
  lg: "text-base px-4 py-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  as: Component = "button",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus-visible:ring disabled:opacity-60 disabled:cursor-not-allowed";

  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  const classes = `${base} ${variantClass} ${sizeClass} ${className}`.trim();

  // If the component is a button → add type + disabled props
  if (Component === "button") {
    return (
      <button type={type} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }

  // Any other element (a, div, Link, etc.)
  return (
    <Component className={classes} aria-disabled={disabled} {...props}>
      {children}
    </Component>
  );
}
