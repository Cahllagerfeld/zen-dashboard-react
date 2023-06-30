import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";

const cardVariants = cva("p-8", {
	variants: {
		background: {
			white: "bg-white"
		},
		size: {
			large: "rounded-3xl"
		}
	},
	defaultVariants: {
		background: "white",
		size: "large"
	}
});

interface CardProps extends VariantProps<typeof cardVariants>, HTMLAttributes<HTMLDivElement> {}

function Card({ background, size, className, children, ...props }: CardProps) {
	return (
		<div className={twMerge(cardVariants({ background, size }), className)} {...props}>
			{children}
		</div>
	);
}

export default Card;
