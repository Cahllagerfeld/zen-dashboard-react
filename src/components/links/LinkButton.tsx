import { cva, VariantProps } from "class-variance-authority";
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

function LinkButton({ children, fullWidth, intent, ...rest }: LinkButtonProps) {
	return (
		<Link className={linkButtonVariants({ intent, fullWidth })} {...rest}>
			{children}
		</Link>
	);
}

export default LinkButton;
