export const formatPrice = (price: number): string => {
  // Format the number using the 'en-EG' locale with no decimal places
  const formattedPrice = new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  // Replace 'EGP' with 'جنيه مصري'
  return formattedPrice.replace("EGP", "جنيه مصري").trim();
};
