import { useCurrentUser } from "@/data/user/active-user-query";
import PrimaryCirle from "@/components/primary-circle";
import Skeleton from "react-loading-skeleton";
import LogoutButton from "@/components/buttons/LogoutButton";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { useBreadcrumbs } from "@/components/breadcrumb/BreadcrumbContext";

function Topbar() {
	const { items } = useBreadcrumbs();
	const user = useCurrentUser();

	return (
		<aside className="flex h-9 items-center justify-between border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-1">
			<div>{items.length > 0 && <Breadcrumb items={items} />}</div>
			<div className="flex gap-2">
				<LogoutButton />
				{user.data ? (
					<PrimaryCirle text={user.data.name} />
				) : (
					<Skeleton height={48} width={48} circle />
				)}
			</div>
		</aside>
	);
}

export default Topbar;

// [
// 	{ label: "Home", href: "/" },
// 	{ label: "Pipelines", href: "/pipelines" }
// ]
