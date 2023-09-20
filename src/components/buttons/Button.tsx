import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@zenml-io/react-component-library";

const buttonVariants = cva("rounded-lg px-4 py-2 transition-all duration-150 active:scale-95", {
	variants: {
		intent: {
			secondary: "bg-secondary text-white hover:bg-secondary-dark"
		},
		fullWidth: {
			true: "w-full"
		}
	}
});

type ButtonHTMLProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps
	extends VariantProps<typeof buttonVariants>,
		Omit<ButtonHTMLProps, "children">,
		Required<Pick<ButtonHTMLProps, "children">> {}

function Button({ intent, fullWidth, children, className, ...props }: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ intent, fullWidth }), className)} {...props}>
			{children}
		</button>
	);
}

export default Button;
