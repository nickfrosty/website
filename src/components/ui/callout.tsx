import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

const calloutVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      warning: "",
      error: "",
      success: "",
      info: "",
      sparkles: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const calloutIconVariants = cva(
  "absolute -top-3 -left-5 rounded-full bg-gray-950 p-[10px] [&>svg]:h-6 [&>svg]:w-6",
  {
    variants: {
      variant: {
        default: "bg-indigo-500",
        warning: "bg-yellow-400 text-yellow-900",
        error: "bg-red-600",
        success: "bg-green-700",
        info: "bg-blue-600",
        sparkles: "bg-indigo-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const calloutContentVariants = cva(
  "space-y-2 rounded-r-lg border-l-4 px-6 py-6 bg-slate-800 [&_p]:!my-0 [&_p]:!py-0 [&_p]:!leading-normal [&_a]:shadow-yellow [&_a]:text-white",
  {
    variants: {
      variant: {
        default:
          "border-indigo-500 [&_:not(pre)>code]:!border-indigo-600 [&_:not(pre)>code]:!bg-indigo-900",
        warning:
          "border-yellow-400 [&_a]:shadow-indigo [&_:not(pre)>code]:!border-orange-700 [&_:not(pre)>code]:!bg-orange-900",
        error: "border-red-600 [&_:not(pre)>code]:!border-red-700 [&_:not(pre)>code]:!bg-red-900",
        success:
          "border-green-700 [&_:not(pre)>code]:!border-green-700 [&_:not(pre)>code]:!bg-green-800",
        info: "border-blue-600 [&_:not(pre)>code]:!border-blue-600 [&_:not(pre)>code]:!bg-blue-900",
        sparkles:
          "border-indigo-500 [&_:not(pre)>code]:!border-indigo-600 [&_:not(pre)>code]:!bg-indigo-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Legacy type values from MDX content */
type LegacyCalloutType =
  | "blockquote"
  | "sparkles"
  | "warn"
  | "warning"
  | "caution"
  | "yellow"
  | "red"
  | "error"
  | "green"
  | "success"
  | "blue"
  | "note"
  | "pro"
  | "indigo"
  | "purple";

type CalloutVariant = NonNullable<VariantProps<typeof calloutVariants>["variant"]>;

const iconMap: Record<CalloutVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  default: InformationCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationTriangleIcon,
  success: StarIcon,
  info: BoltIcon,
  sparkles: SparklesIcon,
};

/** Maps legacy type values to canonical variants */
function resolveCalloutVariant(type?: LegacyCalloutType): CalloutVariant {
  switch (type) {
    case "warn":
    case "warning":
    case "caution":
    case "yellow":
      return "warning";
    case "red":
    case "error":
      return "error";
    case "green":
    case "success":
      return "success";
    case "blue":
    case "note":
    case "pro":
      return "info";
    case "blockquote":
    case "sparkles":
      return "sparkles";
    case "purple":
    case "indigo":
    default:
      return "default";
  }
}

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof calloutVariants> {
  /** Legacy type prop for backward compatibility with MDX content */
  type?: LegacyCalloutType;
  /** Optional title displayed at the top of the callout */
  title?: string;
  /** Custom icon to override the default */
  icon?: React.ReactNode;
  /** Hide the icon */
  hideIcon?: boolean;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, type, title, icon, hideIcon = false, children, ...props }, ref) => {
    // Resolve variant from legacy type if variant not explicitly set
    const resolvedVariant = variant ?? resolveCalloutVariant(type);
    const IconComponent = iconMap[resolvedVariant];

    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        {!hideIcon && (
          <div className={calloutIconVariants({ variant: resolvedVariant })}>
            {icon ?? <IconComponent />}
          </div>
        )}
        <div className={calloutContentVariants({ variant: resolvedVariant })}>
          {title && <h5 className="text-xl font-semibold">{title}</h5>}
          {children}
        </div>
      </div>
    );
  },
);
Callout.displayName = "Callout";

export {
  Callout,
  calloutVariants,
  calloutIconVariants,
  calloutContentVariants,
  resolveCalloutVariant,
};
