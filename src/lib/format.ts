export const formatPrice = (price: number): string => {
  // Format the number without any decimal places or commas
  const formattedPrice = new Intl.NumberFormat("en-EG", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  // Return the formatted string in the desired format
  return `اشترك الان ${formattedPrice} جنية مصري`;
};
