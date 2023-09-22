import { Link } from "react-router-dom";
import { routePaths } from "@/routes/route-paths";
import ConfigCard from "../detail/cards/ConfigCard";
import OverviewCard from "../detail/cards/OverviewCard";
import { useStackComponentDetail } from "@/data/stack-components/detail-components-query";
import { ReactComponent as X } from "@/assets/close.svg";
import { ReactComponent as Maximize } from "@/assets/maximize.svg";
import { ReactComponent as Cube } from "@/assets/cube.svg";

type SidebarProps = {
	id: string;
	resetSelected: () => void;
};

function Sidebar({ id, resetSelected }: SidebarProps) {
	const { data, isLoading } = useStackComponentDetail({ id });

	if (isLoading) return <p>Fetching...</p>;
	return (
		<aside className="top-20 sticky h-[80vh] w-1/3 space-y-8 overflow-y-auto p-4 pr-0">
			{data && (
				<>
					<div className="flex items-center justify-between">
						<div className="text-2xl flex gap-2">
							<Cube className="h-8 w-8" />
							{data.name}
						</div>
						<div className="flex gap-2">
							<Link to={routePaths.components.detail(data.id)}>
								<Maximize className="h-6 w-6" />
							</Link>
							<button aria-label="close sidebar" onClick={() => resetSelected()}>
								<X className="h-6 w-6" />
							</button>
						</div>
					</div>
					<OverviewCard stackComponent={data} />
					<ConfigCard config={data.configuration} />
				</>
			)}
		</aside>
	);
}

export default Sidebar;
