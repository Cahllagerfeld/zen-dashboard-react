import { useStackComponentDetail } from "../detail/query";

type SidebarProps = {
	id: string;
	setSelected: (value: string) => void;
};

function Sidebar({ id, setSelected }: SidebarProps) {
	const { data, isLoading } = useStackComponentDetail({ id });

	if (isLoading) return <p>Fetching...</p>;
	return (
		<aside className="sticky top-20 h-[80vh] w-1/3 space-y-8 overflow-y-auto p-4">
			<button onClick={() => setSelected("")}>Close</button>
			<div>{JSON.stringify(data)}</div>
		</aside>
	);
}

export default Sidebar;
