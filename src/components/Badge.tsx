import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const badgeVariants = cva("rounded-xl px-4 py-1 border text-sm", {
	variants: {
		intent: {
			success: "border-green-700 text-green-700",
			error: "border-red-700 text-red-700"
		}
	}
});

interface BadgeProps extends VariantProps<typeof badgeVariants>, HTMLAttributes<HTMLSpanElement> {}

function Badge({ intent, className, children, ...props }: BadgeProps) {
	return (
		<span className={badgeVariants({ intent })} {...props}>
			{children}
		</span>
	);
}

export default Badge;
