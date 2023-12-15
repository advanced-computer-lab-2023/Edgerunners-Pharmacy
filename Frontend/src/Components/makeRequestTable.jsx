import axios from 'axios';

export const makeRequestTable = async () => {
  const data = [];
  try {
    const response = await axios.get('http://localhost:3001/getPharmacist');
    const pharmacists = response.data.filter((pharmacist) => pharmacist.ReqStatus === 'Pending');

    for (let i = 0; i < pharmacists.length; i++) {
      const p = pharmacists[i];
      const id = i;
      const username = `${p.Username}`;
      const fullName = `${p.Name}`;
      const email = `${p.Email}`;
      const dateOfBirth = p.DOB;
      const hourlyRate = p.Hourlyrate;
      const affiliation = `${p.Affiliation}`;
      const educationalBackground = `${p.Education}`;
      const reqStatus = `${p.ReqStatus}`;
      const files  = p.FileNames;

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
        files,
      });
    }
  } catch (error) {
    console.error('Error fetching Pharmacists:', error);
  }

  return data;
};