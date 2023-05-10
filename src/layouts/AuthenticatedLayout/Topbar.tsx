import { useCurrentUser } from "../../data/user/active-user-query";
import PrimaryCirle from "../../components/primary-circle";
import Skeleton from "react-loading-skeleton";

function Topbar() {
	const user = useCurrentUser();
	return (
		<aside className="mx-4 mt-4 flex h-20 items-center justify-between rounded-3xl bg-theme-background-offset p-4">
			<div></div>
			{user.data ? (
				<PrimaryCirle text={user.data.name} />
			) : (
				<Skeleton height={48} width={48} circle />
			)}
		</aside>
	);
}

export default Topbar;
