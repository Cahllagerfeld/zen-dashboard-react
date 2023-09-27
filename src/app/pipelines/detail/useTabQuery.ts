import { z } from "zod";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PipelineDetailQuerySchema = z.object({
	tab: z.enum(["runs", "config"]).default("runs").catch("runs")
});

export type PipelineDetailQuery = z.infer<typeof PipelineDetailQuerySchema>;

export function useTabQuery() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { tab: parsedTab } = PipelineDetailQuerySchema.parse({
		tab: searchParams.get("tab")
	});

	const [activeTab, setActiveTab] = useState<PipelineDetailQuery["tab"]>(parsedTab);

	useEffect(() => {
		searchParams.set("tab", activeTab);
		setSearchParams(searchParams, { replace: true });
	}, [searchParams, setSearchParams, activeTab]);

	function handleTabChange(tab: string) {
		setActiveTab(tab as PipelineDetailQuery["tab"]);
	}

	return {
		activeTab,
		handleTabChange
	};
}
