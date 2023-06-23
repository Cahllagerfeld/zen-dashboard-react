import * as Tabs from "@radix-ui/react-tabs";

function TabsDemo() {
	return (
		<Tabs.Root className="flex w-full flex-col" defaultValue="stacks">
			<Tabs.List className="flex h-16 w-full shrink-0 items-center rounded-3xl bg-white px-8 text-2xl">
				<Tabs.Trigger
					className="flex justify-center data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-primary"
					value="stacks"
				>
					Stacks
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content className="grow pt-4" value="stacks">
				Content
			</Tabs.Content>
		</Tabs.Root>
	);
}

export default TabsDemo;
