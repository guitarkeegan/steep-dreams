export const getSavedOrderIds = () => {
  const savedOrderIds = localStorage.getItem("saved_orders")
    ? JSON.parse(localStorage.getItem("saved_orders"))
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

export const saveOrderIds = (orderIdArr) => {
    if (orderIdArr.length) {
      localStorage.setItem('saved_orders', JSON.stringify(orderIdArr));
    } else {
      localStorage.removeItem('saved_orders');
    }
  };