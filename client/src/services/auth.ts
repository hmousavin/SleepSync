import axios from 'axios'
const server = `${import.meta.env.VITE_API_URL}`
const baseUrl = `${server}/api`

interface Registration {
    fullname: string
    email: string
    password: string
}

const register = async (credentials: Registration) => {
    const response = await axios.post(`${baseUrl}/register`, credentials)
    return response.data
}

interface Login {
    email: string
    password: string
}

const login = async (credentials: Login) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const logout = async () => {
    try {
        await axios.post(`${baseUrl}/logout`, {}, { 
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("authToken")}` }
        });
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        sessionStorage.removeItem("authToken");
        window.location.href = "/sign-in";
    }   
}

export { register, login, logout }