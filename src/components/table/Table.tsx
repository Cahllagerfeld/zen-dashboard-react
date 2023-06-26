import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { twMerge } from "tailwind-merge";

type TableProps<T> = {
	data: T[];
	columnDef: ColumnDef<T, any>[];
};

function Table<T>({ data, columnDef }: TableProps<T>) {
	const table = useReactTable({
		data,
		columns: columnDef,
		getCoreRowModel: getCoreRowModel()
	});

	return (
		<div className="overflow-auto">
			<table className="w-full table-auto border-separate border-spacing-y-4 text-left">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th className="px-2" key={header.id}>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									className={twMerge(
										`whitespace-nowrap bg-white p-3 first:rounded-l-lg last:rounded-r-lg`,
										cell.column.columnDef.meta?.className
									)}
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
