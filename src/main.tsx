import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient, QueryCache } from "@tanstack/react-query";
import { FetchError } from "./data/fetch-error.ts";

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError(error) {
			if (error instanceof FetchError) {
				if (error.status === 401) {
					//TODO Handle Error here
				}
			}
		}
	})
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
