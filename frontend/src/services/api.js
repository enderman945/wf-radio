const API_BASE_URL = 'http://localhost:8000';

export async function fetchMods() {
  try {
    const response = await fetch(`${API_BASE_URL}/list/mods`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return [];
  }
}

export async function fetchMod(mod_name) {
  try {
    const response = await fetch(`${API_BASE_URL}/mods/${mod_name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return null;
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error('Failed to fetch items:', error);
    throw error;
  }
}

export async function createMod(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ }) //TODO
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return null;
  }
}