import { Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { routePaths } from "@/routes/route-paths";
import { ReactComponent as AlertCircle } from "@/assets/alert-circle.svg";

export default function NoMatch() {
	return (
		<div className="flex w-full justify-center p-5">
			<div className="flex max-w-2xl flex-col items-center gap-5 p-9">
				<AlertCircle width={120} height={120} className="fill-neutral-300" />
				<div>
					<h1 className="mb-2 text-display-xs font-semibold">Oops, Something Went Wrong :(</h1>
					<p className="text-theme-text-secondary">
						We're sorry, but you hit a route that doesn't exist
					</p>
				</div>
				<Button asChild>
					<Link to={routePaths.home()}>Go to Dashboard</Link>
				</Button>
				<a
					className="text-theme-text-brand underline transition-all duration-200 hover:decoration-transparent"
					href="https://github.com/Cahllagerfeld/zen-dashboard-react/issues/new"
				>
					Report an issue
				</a>
			</div>
		</div>
	);
}
