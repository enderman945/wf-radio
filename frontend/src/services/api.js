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