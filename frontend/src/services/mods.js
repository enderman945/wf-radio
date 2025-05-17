import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000'; //TODO use config manager instead


export async function createMod(mod_data) {
    try {
        const auth_token = Cookies.get('authToken');

        const response = await fetch(`${API_BASE_URL}/mods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth_token,
            },
            body: JSON.stringify({...mod_data})
        });

        if (!response.ok) {
            console.error(response.body); //TODO integrate body to error
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Failed to create mod:', error);
        throw error;
    }
}


export async function listMods(filters) {
    try {
        let url_parameters = ""; 

        // Parse filters
        for (const [key, value] of Object.entries(filters)) {
            if (url_parameters === "") {
                url_parameters += "?"
            } else {
                url_parameters += "&"
            }

            url_parameters += `${key}=${value}`;
        }

        // Query 
        const response = await fetch(`${API_BASE_URL}/list/mods/${url_parameters}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Return
        const data = await response.json();
        return data;

  } catch (error) {
        console.error('Failed to fetch mods:', error);
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
        console.error('Failed to fetch mod:', error);
        throw error;
  }
}


export async function deleteMod(mod_name) {
    try {
        const auth_token = Cookies.get('authToken');

        const response = await fetch(`${API_BASE_URL}/mods/${mod_name}`, {
            method: 'DELETE',
            headers: {
                'Authorization': auth_token,
            }
        });

        if (!response.ok) {
            console.error(response.body); //TODO integrate body to error
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Failed to delete mod:', error);
        throw error;
    }
}