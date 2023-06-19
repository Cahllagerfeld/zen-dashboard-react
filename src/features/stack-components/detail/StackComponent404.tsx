import LinkButton from "../../../components/links/LinkButton";
import { routePaths } from "../../../routes/route-paths";
import { useWorkspaceStore } from "../../../state/stores/workspace-store";

type StackComponent404Props = {
	id: string;
};

function StackComponent404({ id }: StackComponent404Props) {
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="bg-gradient-to-br from-primary to-primary-light bg-clip-text text-6xl font-medium text-transparent">
				Oops!
			</p>
			<p>
				It looks like the Stack Component with ID: <strong>{id}</strong> doesn't exist.
			</p>
			<LinkButton intent="secondary" to={routePaths.components.overview(activeWorkspace)}>
				Back to safety
			</LinkButton>
		</div>
	);
}

export default StackComponent404;
