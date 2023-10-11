
import axios from 'axios';

export const makePatientData = async () => {
  const data = [];
  let Patient = null;
  try {
    const response = await axios.get("http://localhost:3001/getPatient");
    Patient = response.data;
    //console.log(Pharmacist);
  } catch (error) {
    console.error("Error fetching Patient:", error);
  }
  for (let i = 0 ; i < Patient.length ; i++) {
    let p = Patient[i];
    const id =i;
    const username =  p.Username;
    const fullName = p.Name;
    const email =  p.Email;
    const dateOfBirth =  p.DOB; 
    const gender =  p.Gender;
    const mobileNumber =  p.phoneNumber;
    // const emergencyContactName =  p.EmergencyContact.FullnameEC;
    // const emergencyContactPhone =  p.EmergencyContact.phoneNumberEC;
  

    data.push({
      id,
      username,
      fullName,
      email,
      dateOfBirth,
      gender,
      mobileNumber,
      // emergencyContactName,
      // emergencyContactPhone,
    });
  }
  return data;
};

