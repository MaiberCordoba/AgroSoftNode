import { createContext, useState, useEffect, useCallback } from 'react';
import { getUser } from '@/api/Auth'; // Suponiendo que getUser verifica el token y devuelve los datos del usuario

interface AuthContextType {
  user: any;
  token: string | null;
  isLoading: boolean; // <-- Nuevo estado para indicar si estamos cargando/validando
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // <-- Inicia en true

  const logout = useCallback(() => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsLoading(false); // Cuando hacemos logout, ya no estamos cargando
  }, []);

  // Efecto principal para verificar el token y sincronizar el estado
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true); // Siempre que iniciamos la verificación, estamos cargando
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        // No hay token en localStorage, limpia el estado y termina la carga
        setToken(null);
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Si el token en el estado no coincide con el de localStorage, actualiza
      if (token !== storedToken) {
        setToken(storedToken);
      }

      // Si hay un token y no hay usuario (o el token es diferente al validado)
      if (storedToken && !user) {
        try {
          const userData = await getUser(storedToken);
          setUser(userData);
          setToken(storedToken); // Asegura que el token en estado sea el correcto
        } catch (error) {
          console.error('Error al verificar el token o cargar el usuario:', error);
          logout(); // Si falla, cerramos sesión
        } finally {
          setIsLoading(false); // Terminamos de cargar/validar
        }
      } else if (storedToken && user) {
        // Ya tenemos token y usuario válidos, solo terminamos de cargar
        setIsLoading(false);
      } else {
        // Caso de no token y no usuario, ya se manejó arriba.
        // Pero si llegamos aquí, simplemente aseguramos que isLoading sea false
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [token, user, logout]); // Dependencias: token, user y logout

  // Efecto para una "verificación periódica" (polling) del token
  // Mantiene esta lógica si te gusta la detección a tiempo.
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      // Si el token en el estado actual difiere del localStorage
      if (token !== currentToken) {
        console.log("Detectado cambio externo en el token de localStorage. Sincronizando...");
        setToken(currentToken); // Actualizar el estado para que el primer useEffect lo maneje
        if (!currentToken) {
            logout(); // Si fue eliminado, forzar logout inmediato
        }
      }
    }, 2000); // Verifica cada 2 segundos (ajusta si es necesario)

    return () => clearInterval(interval);
  }, [token, logout]);

  // Efecto para escuchar cambios en localStorage desde OTRAS PESTAÑAS/VENTANAS
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        const newToken = event.newValue;
        if (!newToken) {
          console.log('Token removido/malformado en localStorage por otra pestaña. Cerrando sesión...');
          logout();
        } else {
          setToken(newToken); // Actualiza el estado para que el useEffect principal lo revalide
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [logout]);

  const login = (newToken: string) => {
    setIsLoading(true); // Al iniciar sesión, estamos cargando
    localStorage.setItem('token', newToken);
    setToken(newToken);
    // Podrías llamar a getUser aquí o dejar que el useEffect principal lo haga
    getUser(newToken)
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Error al iniciar sesión y cargar usuario:', error);
        logout(); // Si falla al cargar usuario después de login, cerrar sesión
      })
      .finally(() => {
        setIsLoading(false); // Terminamos de cargar
      });
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};