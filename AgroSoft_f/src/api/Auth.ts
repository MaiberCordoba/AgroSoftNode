import apiClient from "./apiClient.ts";

export const login = async ({ email, password }: { email: string; password: string }) => {
  console.log("URL completa:", import.meta.env.VITE_API_URL + "login");
  try {
    const response = await apiClient.post("login", {
      correoElectronico: email, // Asegúrate de que el backend espera "correoElectronico"
      password
    }, {
      headers: { "Content-Type": "application/json" }
    });

    return response.data; // Devuelve los tokens JWT (access y refresh)

  } catch (error: any) {
    console.error("Error de autenticación:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Error en el login");
  }
};

