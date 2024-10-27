export async function authUser(username, password) {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    document.cookie = `token = ${data.accessToken}; path=/;`;
    return true;
  }

  if (!response.ok) {
    return null;
  }
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export async function getCurrentAuthUser() {
  const token = getCookie("token");

  const response = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}

export async function checkisIsAuthenticated() {
  const check = getCookie("token");
  if (check) return true;
  return false;
}
