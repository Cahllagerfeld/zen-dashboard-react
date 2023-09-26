import { useCurrentUser } from "@/data/users/active-user-query";
import PrimaryCirle from "@/components/primary-circle";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useBreadcrumbs } from "@/components/breadcrumb/BreadcrumbContext";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover";
import { User } from "@/types/user";
import { useWorkspaceStore } from "@/state/stores/workspace-store";
import LogoutButton from "@/components/buttons/LogoutButton";
import { ReactComponent as ChevronDown } from "@/assets/chevron-down.svg";

function Topbar() {
	const { items } = useBreadcrumbs();
	const { data, isLoading, isError } = useCurrentUser();

	if (isError) return null;
	if (isLoading) return null;

	return (
		<aside className="flex h-9 items-center justify-between border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-1">
			<div>{items.length > 0 && <Breadcrumb items={items} />}</div>
			<div>
				<TopbarPopover user={data} />
			</div>
		</aside>
	);
}

export default Topbar;

type TopbarPopverProps = {
	user: User;
};

function TopbarPopover({ user }: TopbarPopverProps) {
	const { name } = user;
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	return (
		<Popover>
			<PopoverTrigger asChild>
				<button className="flex items-center gap-2">
					<div className="text-end text-text-sm">
						<p className="font-semibold">{name}</p>
						<p className="text-theme-text-secondary">{activeWorkspace}</p>
					</div>
					<PrimaryCirle text={name} />
					<ChevronDown className="fill-neutral-400" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="bg-theme-surface-primary" align="end">
				<LogoutButton />
			</PopoverContent>
		</Popover>
	);
}
