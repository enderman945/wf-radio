import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000'; //TODO use config manager instead


export async function createMod(mod_data) {
    try {
        const auth_token = Cookies.get('authToken');

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth_token,
            },
            body: JSON.stringify({...mod_data})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Failed to fetch items:', error);
        throw error;
    }
}


export async function listMods(filters) {
  try {
    const response = await fetch(`${API_BASE_URL}/list/mods`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw error;
  }
}


export async function getMod(mod_name) {
  try {
    const response = await fetch(`${API_BASE_URL}/mods/${mod_name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw error;
  }
}