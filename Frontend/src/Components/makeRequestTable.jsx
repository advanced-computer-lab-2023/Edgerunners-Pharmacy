// Helper function to generate random data
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate mock request data
export const makeRequestTable = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const username = `user${id}`;
    const name = `User ${id} Full Name`;
    const email = `user${id}@example.com`;
    const password = `password${id}`;
    const dob = '1990-01-01'; // Replace with a random date generation logic
    const hourlyRate = getRandomValue(20, 100); // Hourly rate between 20 and 100
    const affiliation = `Hospital ${getRandomValue(1, 5)}`; // Random hospital affiliation
    const educationalBackground = `Education ${id}`; // Educational background

    data.push({
      id,
      username,
      name,
      email,
      password,
      dob,
      hourlyRate,
      affiliation,
      education: educationalBackground, // Rename to match RequestTable's column name
      status: 'Pending', // Add status field
    });
  }
  return data;
};

// Sample data
export const requestData = makeRequestTable(10); // Generate 10 random requests