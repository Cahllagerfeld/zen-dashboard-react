import { useWorkspaces } from "./workspace-query";

function Home() {
	const { data } = useWorkspaces();

	return <pre>{JSON.stringify(data?.items)}</pre>;
}

export default Home;
