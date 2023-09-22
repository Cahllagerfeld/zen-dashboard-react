import { cn } from "@zenml-io/react-component-library";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

const badge = cva("rounded-rounded uppercase inline-block py-0.5 px-2 text-text-sm font-semibold", {
	variants: {
		variant: {
			default: "bg-primary-50 text-theme-text-brand",
			success: "bg-success-100 text-success-800",
			info: "bg-blue-50 text-blue-600",
			disabled: "bg-neutral-200 text-theme-text-secondary"
		}
	},
	defaultVariants: {
		variant: "default"
	}
});

type BadgeProps = VariantProps<typeof badge>;
interface ButtonVariants extends HTMLAttributes<HTMLDivElement>, BadgeProps {}

const Badge = forwardRef<HTMLDivElement, ButtonVariants>(
	({ children, className, variant, ...rest }, ref) => (
		<div className={cn(badge({ variant }), className)} ref={ref} {...rest}>
			{children}
		</div>
	)
);

Badge.displayName = "Badge";

export { Badge };
