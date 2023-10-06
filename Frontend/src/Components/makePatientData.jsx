//random data populating table needs to be changed


// Helper function to generate random data
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate mock data
export const makePatientData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const username = `user${id}`;
    const fullName = `User ${id} Full Name`;
    const email = `user${id}@example.com`;
    const password = `password${id}`;
    const dateOfBirth = '1990-01-01'; // Replace with a random date generation logic
    const gender = ['Male', 'Female', 'Other'][getRandomValue(0, 2)];
    const mobileNumber = `+1 123-456-${id.toString().padStart(4, '0')}`;
    const emergencyContactName = `Emergency Contact ${id} Name`;
    const emergencyContactPhone = `+1 789-123-${id.toString().padStart(4, '0')}`;
    const relationToPatient = `Relation ${id}`;

    data.push({
      id,
      username,
      fullName,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyContactName,
      emergencyContactPhone,
      relationToPatient,
    });
  }
  return data;
};

// Sample data
export const data = makePatientData(10);