const CART_KEY = "cart";

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (_error) {
    return [];
  }
};

export const saveCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
};

export const addToCart = (product, quantity = 1) => {
  const items = getCart();
  const existingItem = items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    items.push({ ...product, quantity });
  }

  return saveCart(items);
};

export const updateCartQuantity = (productId, quantity) => {
  const items = getCart();
  const nextItems =
    quantity <= 0
      ? items.filter((item) => item.id !== productId)
      : items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );

  return saveCart(nextItems);
};

export const removeFromCart = (productId) => {
  const nextItems = getCart().filter((item) => item.id !== productId);
  return saveCart(nextItems);
};
