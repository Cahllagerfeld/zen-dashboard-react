import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";

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
		<button className={twMerge(buttonVariants({ intent, fullWidth }), className)} {...props}>
			{children}
		</button>
	);
}

export default Button;
