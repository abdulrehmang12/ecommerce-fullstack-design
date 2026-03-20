const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const withAuthHeaders = (token) =>
  token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const message = errorPayload.message || "Request failed";
    throw new Error(message);
  }

  return response.json();
};

export const productsApi = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ""}`);
  },

  getFeaturedProducts: () => request("/products?featured=true"),

  getCategories: () => request("/products/categories"),

  getProductById: (id) => request(`/products/${id}`),

  createProduct: (payload, token) =>
    request("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...withAuthHeaders(token)
      },
      body: JSON.stringify(payload)
    }),

  updateProduct: (id, payload, token) =>
    request(`/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...withAuthHeaders(token)
      },
      body: JSON.stringify(payload)
    }),

  deleteProduct: (id, token) =>
    request(`/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...withAuthHeaders(token)
      }
    })
};
