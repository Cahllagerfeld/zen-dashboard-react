import { cn } from "@zenml-io/react-component-library";
import { cva, VariantProps } from "class-variance-authority";
import { cloneElement, forwardRef, InputHTMLAttributes, ReactElement, ReactNode } from "react";

export const inputVariants = cva(
	cn([
		"transition-all duration-200 rounded-md bg-theme-surface-primary",
		"border-[#D0D5DD] border",
		"text-theme-text-primary",
		"placeholder:text-theme-text-secondary",
		"focus:border-neutral-500 focus:outline-none",
		"disabled:bg-neutral-100 disabled:text-neutral-400"
	]),
	{
		variants: {
			inputSize: {
				sm: "px-2 py-1 text-text-sm",
				md: "px-3 py-2 text-text-md",
				lg: "px-4 py-3 text-text-lg"
			}
		},
		defaultVariants: {
			inputSize: "md"
		}
	}
);

export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	label?: string;
	iconLeft?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, inputSize, label, id, iconLeft, ...props }, ref) => {
		return (
			<div>
				{label && (
					<label htmlFor={id} className="text-sm mb-0.5 block text-theme-text-primary">
						{label}
					</label>
				)}
				<div className="relative">
					{iconLeft && (
						<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
							{cloneElement(iconLeft as ReactElement, {
								className: "fill-neutral-400 pointer-events-none"
							})}
						</span>
					)}
					<input
						id={id}
						type={type}
						className={cn(inputVariants({ inputSize }), iconLeft ? "pl-8" : "", className)}
						ref={ref}
						{...props}
					/>
				</div>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
