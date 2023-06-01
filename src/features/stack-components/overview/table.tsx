import { createColumnHelper } from "@tanstack/react-table";
import { StackComponent } from "../../../types/stack-component";
import { Link } from "react-router-dom";
import { routePaths } from "../../../routes/route-paths";

const columnHelper = createColumnHelper<StackComponent>();

export function useTableDefinition() {
	return [
		columnHelper.accessor("id", {
			header: () => "ID",
			cell: (id) => (
				<Link className="link" to={routePaths.components.detail(id.getValue())}>
					{id.getValue()}
				</Link>
			)
		}),
		columnHelper.accessor("name", {
			header: () => "Name",
			cell: (name) => name.getValue()
		}),
		columnHelper.accessor("type", {
			header: "Type",
			cell: (type) => type.getValue()
		}),
		columnHelper.accessor("flavor", {
			header: "Flavor",
			cell: (flavor) => flavor.getValue()
		}),
		columnHelper.accessor("is_shared", {
			header: "Shared",
			cell: (isShared) => (isShared.getValue() ? "Yes" : "No")
		}),
		columnHelper.accessor("created", {
			header: "Created",
			cell: ({ getValue }) => {
				return <time>{new Date(getValue()).toLocaleString()}</time>;
			}
		})
	];
}
