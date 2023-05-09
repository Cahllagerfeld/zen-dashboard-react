import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkspaceStore {
	activeWorkspace: string;
	setActiveWorkspace: (workspace: string) => void;
}

export const useWorkspaceStore = create(
	persist<WorkspaceStore>(
		(set) => ({
			activeWorkspace: "default",
			setActiveWorkspace: (workspace: string) => set(() => ({ activeWorkspace: workspace }))
		}),
		{
			name: "workspace-storage"
		}
	)
);
