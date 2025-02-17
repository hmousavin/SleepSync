import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("authToken"),
  login: (token: string) => {
    localStorage.setItem("authToken", token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
