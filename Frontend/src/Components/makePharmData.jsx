// makeData.js

import axios from "axios";

export const makePharmData = async () => {
  const data = [];
  let Pharmacist = null;
  try {
    const response = await axios.get("http://localhost:3001/getPharmacist");
    Pharmacist = response.data;
    //console.log(Pharmacist);
  } catch (error) {
    console.error("Error fetching Pharmacist:", error);
  }
  for (let i = 0 ; i < Pharmacist.length ; i++) {
    let p = Pharmacist[i];
    //console.log(p.Username);
    const id = i;
    const username = `${p.Username}`;
    const fullName =`${p.Name}`;
    const email = `${p.Email}`;
    const dateOfBirth =p.DOB  ; // Replace with a random date generation logic
    const hourlyRate =p.Hourlyrate; // Hourly rate between 20 and 100
    const affiliation =`${p.Affiliation}` ; // Random hospital affiliation
    const educationalBackground =`${p.Education}`; // Educational background
    const reqStatus = `${p.reqStatus}`; //Request status

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
  //console.log(data);
  return data;
};

