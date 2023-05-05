import { useCurrentUser } from "../../data/user/active-user-query";
import PrimaryCirle from "../../components/primary-circle";

function Topbar() {
	const user = useCurrentUser();
	return (
		<aside className="mx-4 mt-4 flex h-20 items-center justify-between rounded-3xl bg-theme-background-offset p-4">
			<div></div>
			<PrimaryCirle text={user.data?.name || ""} />
		</aside>
	);
}

export default Topbar;
