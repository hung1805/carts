export const stringCap = (string) => {
  const arr = string.split(" ");
  let newString = "";
  arr.forEach((element) => {
    newString += `${element.charAt(0).toUpperCase() + element.slice(1)} `;
  });
  return newString;
};
export const roundedPrice = (price, count) => {
  return (price * count).toFixed(2);
};
export const calculateTotal = (list) => {
  const total = list.reduce((initial, item) => {
    return initial + parseFloat(item.totalPrice);
  }, 0);
  return total.toFixed(2);
};
