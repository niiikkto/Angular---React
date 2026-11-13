const BASE = 'https://jsonplaceholder.typicode.com';

export async function apiFetch(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, options);
    // fetch не считает статусы 404 или 500 ошибкой сети — проверяем вручную
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
}

export function getUsers(signal) {
    return apiFetch('/users', { signal });
}

export function getUserById(id, signal) {
    return apiFetch(`/users/${id}`, { signal });
}