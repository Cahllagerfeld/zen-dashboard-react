import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@zenml-io/react-component-library";

const fabVariants = cva(
	"rounded-full absolute h-12 w-12 bottom-12 right-12 transition-all duration-150 active:scale-95",
	{
		variants: {
			variant: {
				primary: "bg-primary text-white hover:bg-primary-dark"
			}
		},
		defaultVariants: {
			variant: "primary"
		}
	}
);

type ButtonHTMLProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface FABProps
	extends VariantProps<typeof fabVariants>,
		Omit<ButtonHTMLProps, "children">,
		Required<Pick<ButtonHTMLProps, "children">> {}

function FAB({ children, variant, className, ...props }: FABProps) {
	return (
		<button className={cn(fabVariants({ variant }), className)} {...props}>
			{children}
		</button>
	);
}

export default FAB;
