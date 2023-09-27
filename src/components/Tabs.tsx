import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@zenml-io/react-component-library";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={
			"inline-flex  w-full items-center justify-start shadow-[inset_0_-1px_0_0,0_0_0_0] shadow-theme-border-moderate"
		}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
		icon?: React.ReactNode;
	}
>(({ className, icon, children, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={
			"group flex h-[56px] items-center gap-2 px-3 py-2 hover:shadow-[inset_0_-4px_0_0,0_0_0_0] hover:shadow-neutral-300 data-[state=active]:text-primary-500 data-[state=active]:shadow-[inset_0_-4px_0_0,0_0_0_0] data-[state=active]:shadow-primary-400"
		}
		{...props}
	>
		{icon &&
			React.cloneElement(icon as React.ReactElement, {
				className: "group-data-[state=active]:fill-primary-500 fill-neutral-400"
			})}
		{children}
	</TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
			className
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
