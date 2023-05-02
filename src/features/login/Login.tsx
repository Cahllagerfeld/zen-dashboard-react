import { useState } from "react";
import { ReactComponent as ZenmlLogo } from "../../assets/logo-large.svg";

function Login() {
	const [isReadble, setIsReadable] = useState(false);

	function handlePassword() {
		setIsReadable(!isReadble);
	}

	return (
		<div className="flex min-h-screen w-screen items-center justify-center">
			<div className="flex w-full max-w-sm flex-col items-center justify-between gap-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light pb-16 pt-8 shadow-sharper">
				<ZenmlLogo />
				<form className="flex flex-col gap-4">
					<div className="flex w-full items-center gap-2 rounded-lg bg-white px-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
							<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
						</svg>
						<input
							type="text"
							className="w-full border-none py-2 placeholder:text-neutral-300"
							placeholder="Username"
						/>
					</div>
					<div className="flex w-full items-center gap-2 rounded-lg bg-white px-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z"></path>
							<path d="M15 9h.01"></path>
						</svg>
						<input
							type={isReadble ? "text" : "password"}
							placeholder="Password"
							className="w-full border-none py-2 placeholder:text-neutral-300"
						/>
						<button onClick={handlePassword} type="button">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={isReadble ? "stroke-neutral-800" : "stroke-neutral-300"}
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
								<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
							</svg>
						</button>
					</div>

					<button
						type="button"
						onClick={(e) => e.preventDefault()}
						className="self-end text-xs text-white"
					>
						Forgot password?
					</button>
					<button
						type="submit"
						onClick={(e) => e.preventDefault()}
						className="w-full rounded-lg bg-secondary px-4 py-2 text-white transition-all duration-150 hover:bg-secondary-dark active:scale-95"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
