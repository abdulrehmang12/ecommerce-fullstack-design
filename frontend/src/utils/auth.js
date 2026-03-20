const AUTH_KEY = "estore_auth";
const AUTH_EVENT = "auth-state-change";

export const getAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch (_error) {
    return null;
  }
};

export const setAuth = (value) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const getAuthToken = () => getAuth()?.token || "";

export const getAuthUser = () => getAuth()?.user || null;

export const onAuthChange = (handler) => {
  window.addEventListener(AUTH_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(AUTH_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
};
