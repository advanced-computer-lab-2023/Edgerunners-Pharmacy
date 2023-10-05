// makeData.js

// Helper function to generate random data
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate mock data
export const makePharmData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const username = `user${id}`;
    const fullName = `User ${id} Full Name`;
    const email = `user${id}@example.com`;
    const password = `password${id}`;
    const dateOfBirth = '1990-01-01'; // Replace with a random date generation logic
    const hourlyRate = getRandomValue(20, 100); // Hourly rate between 20 and 100
    const affiliation = `Hospital ${getRandomValue(1, 5)}`; // Random hospital affiliation
    const educationalBackground = `Education ${id}`; // Educational background

    data.push({
      id,
      username,
      fullName,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    });
  }
  return data;
};

// Sample data
export const data = makePharmData(10);