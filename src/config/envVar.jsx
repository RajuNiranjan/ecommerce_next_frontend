export const ENV_VAR = {
  API_URI: process.env.NEXT_PUBLIC_API_URI,
  TOKEN: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};
