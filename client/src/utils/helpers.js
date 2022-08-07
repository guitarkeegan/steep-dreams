export default function calculateCount(productArray, count) {
  for (let product of productArray) {
    if (count[product]) {
      count[product] += 1;
    } else {
      count[product] = 1;
    }
  }
  return count;
}
