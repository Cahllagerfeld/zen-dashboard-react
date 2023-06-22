import { useNavigate } from "react-router-dom";
import { useTokenStore } from "@/state/stores";

function LogoutButton() {
	const navigate = useNavigate();
	const reset = useTokenStore((state) => state.reset);

	function handleLogout() {
		reset();
		navigate("/login", { replace: true });
	}

	return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
