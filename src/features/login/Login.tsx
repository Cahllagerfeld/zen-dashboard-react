import { useState } from "react";
import { ReactComponent as ZenmlLogo } from "../../assets/logo-large.svg";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as KeyIcon } from "../../assets/key.svg";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg";

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
						<UserIcon className="stroke-neutral-800" />
						<input
							type="text"
							className="w-full border-none py-2 text-neutral-800 placeholder:text-neutral-300"
							placeholder="Username"
						/>
					</div>
					<div className="flex w-full items-center gap-2 rounded-lg bg-white px-2">
						<KeyIcon className="stroke-neutral-800" />
						<input
							type={isReadble ? "text" : "password"}
							placeholder="Password"
							className="w-full border-none py-2 text-neutral-800 placeholder:text-neutral-300"
						/>
						<button onClick={handlePassword} type="button">
							<EyeIcon className={isReadble ? "stroke-neutral-800" : "stroke-neutral-300"} />
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
