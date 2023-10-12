import axios from "axios";

export const makePharmData = async () => {
  const data = [];
  try {
    const response = await axios.get("http://localhost:3001/getPharmacist");
    const pharmacists = response.data.filter(pharmacist => pharmacist.ReqStatus === 'Accepted');

    for (let i = 0; i < pharmacists.length; i++) {
      const p = pharmacists[i];
      const id = i;
      const username = `${p.Username}`;
      const fullName = `${p.Name}`;
      const email = `${p.Email}`;
      const dateOfBirth = p.DOB; // Replace with a random date generation logic
      const hourlyRate = p.Hourlyrate; // Hourly rate between 20 and 100
      const affiliation = `${p.Affiliation}`; // Random hospital affiliation
      const educationalBackground = `${p.Education}`; // Educational background
      const reqStatus = `${p.ReqStatus}`; // Request status

      data.push({
        id,
        username,
        fullName,
        email,
        dateOfBirth,
        hourlyRate,
        affiliation,
        educationalBackground,
        reqStatus,
      });
    }
  } catch (error) {
    console.error("Error fetching Pharmacists:", error);
  }

  return data;
};