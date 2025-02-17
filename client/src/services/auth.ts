import axios from 'axios'
const server = `${import.meta.env.VITE_API_URL}`
const baseUrl = `${server}/api`

interface Registration {
    fullName: string
    email: string
    password: string
}

const register = async (credentials: Registration) => {
    const response = await axios.post(`${baseUrl}/register`, credentials)
    
    return response.data
}

interface Login {
    username: string
    password: string
}

const login = async (credentials: Login) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

export { register, login }