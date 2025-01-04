import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/auth" : "/api/auth";
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    signUp: async ({ name, email, password, confirmpassword, status }) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, { name, email, password, confirmpassword, status })
            console.log(response.data)
        } catch (error) {
            throw error
        }
    },
}))
