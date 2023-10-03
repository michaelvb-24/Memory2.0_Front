const API_UPDATE = "/api/forgotpassword";

export async function resetPassword(email) {
  const response = await fetch(`${API_UPDATE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  const backResponse = await response.json();
  if (response.ok) {
    return backResponse.message;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error Api Create User");
    }
  }
}