// Helper function to generate random data
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate mock data
export const makeMedicineDataPharm = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const name = `Product ${id}`;
    const picture = `url_to_product_${id}.jpg`; // Replace with actual picture URLs
    const price = getRandomValue(10, 100); // Replace with your price generation logic
    const description = `Description for Product ${id}`;
    const medicinalUse = `Medicinal use for Product ${id}`;
    const availableQuantity = getRandomValue(1, 100); // Replace with your quantity generation logic
    const sales = getRandomValue(0, 50); // Replace with your sales generation logic

    data.push({
      id,
      name,
      picture,
      price,
      description,
      medicinalUse,
      availableQuantity,
      sales,
    });
  }
  return data;
};

// Sample data
export const data = makeMedicineDataPharm(10);