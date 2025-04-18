// src/api.js
export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        // If unauthorized, clear token and send user to login
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return response;
}
