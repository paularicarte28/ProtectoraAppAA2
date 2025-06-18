const API = "http://localhost:3001";

async function apiFetch(endpoint, method = "GET", data = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (data) options.body = JSON.stringify(data);
  const res = await fetch(`${API}${endpoint}`, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.status !== 204 ? res.json() : null;
}