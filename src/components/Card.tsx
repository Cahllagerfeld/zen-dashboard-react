import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { cn } from "@zenml-io/react-component-library";

const cardVariants = cva("p-8", {
	variants: {
		background: {
			white: "bg-white"
		},
		size: {
			large: "rounded-md"
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
		<div className={cn(cardVariants({ background, size }), className)} {...props}>
			{children}
		</div>
	);
}

export default Card;
