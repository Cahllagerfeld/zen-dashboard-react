import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

const linkButtonVariants = cva("rounded-lg px-4 py-2 transition-all duration-150 active:scale-95", {
	variants: {
		intent: {
			secondary: "bg-secondary text-white hover:bg-secondary-dark"
		},
		fullWidth: {
			true: "w-full"
		}
	}
});

type LinkButtonProps = LinkProps &
	VariantProps<typeof linkButtonVariants> & {
		children: ReactNode;
	};

function LinkButton({ children, fullWidth, intent, className, ...rest }: LinkButtonProps) {
	return (
		<Link className={twMerge(linkButtonVariants({ intent, fullWidth }), className)} {...rest}>
			{children}
		</Link>
	);
}

export default LinkButton;
