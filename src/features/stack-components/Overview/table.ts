import { createColumnHelper } from "@tanstack/react-table";
import { StackComponent } from "../../../types/stack-component";

const columnHelper = createColumnHelper<StackComponent>();

export function useTableDefinition() {
	return [
		columnHelper.accessor("id", {
			header: () => "ID",
			cell: (id) => id.getValue()
		}),
		columnHelper.accessor("name", {
			header: () => "Name",
			cell: (name) => name.getValue()
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
			cell: (date) => date.getValue()
		})
	];
}
