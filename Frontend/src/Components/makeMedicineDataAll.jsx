// Helper function to generate random data
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate mock data
export const makeMedicineDataAll = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const name = `Medicine ${id} Name`;
    const picture = `Image URL ${id}`;
    const price = getRandomValue(1, 100); // Adjust the price range as needed
    const description = `Description for Medicine ${id}`;
    const medicinalUse = `Medicinal Use for Medicine ${id}`;

    data.push({
      id,
      name,
      picture,
      price,
      description,
      medicinalUse,
    });
  }
  return data;
};

// Sample data
export const data = makeMedicineDataAll(10);