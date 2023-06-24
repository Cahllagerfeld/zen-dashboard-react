import * as RadixTabs from "@radix-ui/react-tabs";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import StackTable from "./StackTable";
import { useStacks } from "@/features/stacks/query";
import { useWorkspaceStore } from "@/state/stores/workspace-store";

type TabsProps = {
	id: string;
};

function Tabs({ id }: TabsProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);

	const { data, isLoading, isSuccess } = useStacks({
		workspace: activeWorkspace,
		params: {
			component_id: id,
			size: 10
		}
	});

	const tab = searchParams.get("tab");

	const defaultTab = "stacks";

	useEffect(() => {
		const searchValue = searchParams.get("tab");
		if (!searchValue) {
			setSearchParams({ tab: defaultTab }, { replace: true });
		}
	}, [searchParams, setSearchParams]);

	function handleTabChange(value: string) {
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.set("tab", value);
			return newSearchParams;
		});
	}

	return (
		<RadixTabs.Root
			onValueChange={handleTabChange}
			className="flex w-full flex-col"
			defaultValue={tab || defaultTab}
		>
			<RadixTabs.List className="flex h-16 w-full shrink-0 items-center rounded-3xl bg-white px-8 text-2xl">
				<RadixTabs.Trigger
					className="flex justify-center data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-primary"
					value="stacks"
				>
					Stacks
				</RadixTabs.Trigger>
			</RadixTabs.List>
			<RadixTabs.Content className="grow pt-4" value="stacks">
				{isLoading && <p>Fetching...</p>}
				{isSuccess && (
					<ul className="space-y-4">
						{data?.items.map((item) => (
							<li className="rounded-xl bg-white p-3" key={item.id}>
								{item.name || "n/a"}
							</li>
						))}
					</ul>
				)}
			</RadixTabs.Content>
		</RadixTabs.Root>
	);
}

export default Tabs;
