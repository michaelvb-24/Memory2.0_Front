import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context";
import { signin as login } from "../../apis/auth";
import { signout as logout } from "../../apis/auth";

export default function AuthProvider({ children }) {
	const initialUser = useLoaderData();
	const [user, setUser] = useState(initialUser);

	async function signin(credentials) {
		const newUser = await login(credentials);
		setUser(newUser);
		
	}

	console.log(user);

	async function signout() {
		await logout();
		setUser(null);
	}

	return (
		<AuthContext.Provider value={{ user, signin, signout }}>
			{children}{" "}
		</AuthContext.Provider>
	);
}
