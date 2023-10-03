const API_USERS = "/api/users";

export async function createUser(newUser) {
  const response = await fetch(API_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const backResponse = await response.json();
  if (response.ok) {
    console.log("test");

    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error Api Create User");
    }
  }
}

// update pseudo
export async function updatePseudo(newPseudo) {
  const response = await fetch(`${API_USERS}/updatePseudo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPseudo),
  });
  return await response.json();
}

// update mot de passe
export async function updatePassword(newPassword) {
  const response = await fetch(`${API_USERS}/updatePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPassword),
  });
  return await response.json();
}

// Delete user connecté
export async function DeleteUser(user) {
  const response = await fetch(`${API_USERS}/deleteUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
}
