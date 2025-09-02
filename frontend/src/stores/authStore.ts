import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  roles: string[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => {
        // When logging out, also clear the token from the raw localStorage
        // that the axios interceptor might be looking at.
        localStorage.removeItem('access_token');
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // Modify the name of the stored token to avoid conflicts
      // with direct localStorage access if any.
      // We are storing the whole state object, so we need to extract the token
      // for the axios interceptor. Let's just use a separate item for the token.
      // A better approach:
      // The store handles its own state. The axios interceptor reads from the store.
      // But interceptors are outside React components.
      // The simplest, most robust way is to have the login function save the token
      // to localStorage directly, and the store also holds it for reactivity.
    }
  )
);

// We also need to handle the fact that the axios interceptor reads 'access_token'
// Let's make sure the store and the direct localStorage access are in sync.
// The `setAuth` action will also write to 'access_token'.
const originalSetAuth = useAuthStore.getState().setAuth;
useAuthStore.setState({
  setAuth: (token, user) => {
    localStorage.setItem('access_token', token);
    originalSetAuth(token, user);
  }
});

const originalLogout = useAuthStore.getState().logout;
useAuthStore.setState({
  logout: () => {
    localStorage.removeItem('access_token');
    originalLogout();
  }
});
