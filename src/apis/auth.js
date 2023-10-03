const API_USERS = "/api/auth";

export async function signin(credentials) {
	const response = await fetch(API_USERS, {
		method: "POST",
		headers: { "Content-Type": "application/json " },
		body: JSON.stringify(credentials),
	});

	const backResponse = await response.json();
	if (response.ok) {
		return backResponse;
	} else {
		if (backResponse) {
			throw backResponse;
		} else {
			throw new Error("Une erreur est survenue");
		}
	}
}

export async function getCurrentuser() {
	const response = await fetch(`${API_USERS}/current`);
	console.log("test");
	return response.json();
}

export async function signout() {
	await fetch(API_USERS, {
		method: "DELETE",
	});
}
