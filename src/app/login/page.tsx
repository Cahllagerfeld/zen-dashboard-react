import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as ZenmlLogo } from "@/assets/logo-large.svg";
import { ReactComponent as UserIcon } from "@/assets/user.svg";
import { ReactComponent as KeyIcon } from "@/assets/key.svg";
import { ReactComponent as EyeIcon } from "@/assets/eye.svg";
import { useLoginMutation } from "../../data/login/login-mutation";
import { routePaths } from "@/routes/route-paths";
import { useTokenStore } from "@/state/stores";
import { Button } from "@zenml-io/react-component-library";

function Login() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { setToken } = useTokenStore();

	const redirect = searchParams.get("redirect");

	const mutation = useLoginMutation({
		onSuccess(data) {
			setToken(data.access_token);
			navigate(redirect || routePaths.home());
		}
	});
	const [isReadble, setIsReadable] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		mutation.mutate({ username, password });
	}

	function handlePassword() {
		setIsReadable(!isReadble);
	}

	return (
		<div className="flex min-h-screen w-screen items-center justify-center">
			<div className="flex w-full max-w-lg flex-col items-center justify-between overflow-hidden rounded-md  border border-theme-border-moderate bg-theme-surface-primary">
				<div className="flex w-full justify-center bg-gradient-dark p-8">
					<ZenmlLogo className="h-7" />
				</div>
				<div className="flex w-full flex-col items-center p-7 pt-5">
					<div className="mb-7 text-center">
						<h1 className="text-display-xs">Login</h1>
						<p className="pt-2 text-theme-text-secondary">
							Please login with your ZenML Credentials
						</p>
					</div>
					<form className="flex max-w-[300px] flex-col gap-4">
						<div className="flex w-full items-center gap-2 rounded-md border border-neutral-300 px-2">
							<UserIcon className="stroke-neutral-800" />
							<input
								onChange={(e) => setUsername(e.target.value)}
								type="text"
								className="w-full border-none py-2 text-neutral-800 placeholder:text-neutral-300"
								placeholder="Username"
							/>
						</div>
						<div className="flex w-full items-center gap-2 rounded-md border border-neutral-300 px-2">
							<KeyIcon className="stroke-neutral-800" />
							<input
								onChange={(e) => setPassword(e.target.value)}
								type={isReadble ? "text" : "password"}
								placeholder="Password"
								className="w-full border-none py-2 text-neutral-800 placeholder:text-neutral-300"
							/>
							<button onClick={handlePassword} type="button">
								<EyeIcon className={isReadble ? "stroke-neutral-800" : "stroke-neutral-300"} />
							</button>
						</div>

						<button type="button" onClick={(e) => e.preventDefault()} className="text-xs self-end">
							Forgot password?
						</button>
						<Button
							className="flex justify-center"
							type="submit"
							onClick={handleSubmit}
							intent="primary"
						>
							Login
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
