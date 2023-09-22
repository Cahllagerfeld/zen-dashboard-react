import { BreadcrumbItem } from "@/types/common";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type BreadcrumbContextProps = {
	items: BreadcrumbItem[];
	setItems: (items: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextProps | undefined>(undefined);

export function BreadcrumbProvider({ children }: PropsWithChildren) {
	const [items, setItems] = useState<BreadcrumbItem[]>([]);

	const updateItems = (items: BreadcrumbItem[]) => {
		setItems(items);
	};

	return (
		<BreadcrumbContext.Provider value={{ items, setItems: updateItems }}>
			{children}
		</BreadcrumbContext.Provider>
	);
}

export function useBreadcrumbs() {
	const context = useContext(BreadcrumbContext);
	if (!context) {
		throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
	}
	return context;
}
