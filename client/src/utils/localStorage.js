export const getSavedProductIds = () => {
  const savedProductIds = localStorage.getItem("saved_products")
    ? JSON.parse(localStorage.getItem("saved_products"))
    : [];
 
  return savedProductIds;
};


export const removeProductId = (productId) => {
  const savedProductIds = localStorage.getItem("saved_products")
    ? JSON.parse(localStorage.getItem("saved_products"))
    : null;

  if (!savedProductIds) {
    return false;
  }

  let deleteCount = 0;
  const updatedSavedProductIds = [];
  savedProductIds.forEach(savedProductId => {
    if (productId === savedProductId && deleteCount === 0){
      deleteCount++
    } else {
      updatedSavedProductIds.push(savedProductId);
    }
  });
  
  // const updatedSavedProductIds = savedProductIds?.filter(
  //   (savedProductId) => savedProductId !== productId
  // );

  localStorage.setItem("saved_products", JSON.stringify(updatedSavedProductIds));

  return true;
};

// export const saveProductIds = (productIdArr) => {
//     if (productIdArr.length) {
//       localStorage.setItem('saved_orders', JSON.stringify(productIdArr));
//     } else {
//       localStorage.removeItem('saved_orders');
//     }
//   };