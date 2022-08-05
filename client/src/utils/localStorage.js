export const getSavedOrderIds = () => {
  const savedOrderIds = localStorage.getItem("saved_products")
    ? JSON.parse(localStorage.getItem("saved_products"))
    : [];

  return savedOrderIds;
};


export const removeOrderId = (orderId) => {
  const savedOrderIds = localStorage.getItem("saved_orders")
    ? JSON.parse(localStorage.getItem("saved_orders"))
    : null;

  if (!savedOrderIds) {
    return false;
  }

  const updatedSavedOrderIds = savedOrderIds?.filter(
    (savedOrderId) => savedOrderId !== orderId
  );
  localStorage.setItem("saved_orders", JSON.stringify(updatedSavedOrderIds));

  return true;
};

export const saveProductIds = (productIdArr) => {
    if (productIdArr.length) {
      localStorage.setItem('saved_orders', JSON.stringify(productIdArr));
    } else {
      localStorage.removeItem('saved_orders');
    }
  };