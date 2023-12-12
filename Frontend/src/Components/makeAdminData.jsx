import axios from 'axios';

export const makeAdminData = async () => {
  const data = [];
  let Admin = null;
  try {
    const response = await axios.get("http://localhost:3001/getAdmin");
    Admin = response.data;
  } catch (error) {
    console.error("Error fetching Admin:", error);
  }
  for (let i = 0 ; i < Admin.length ; i++) {
    let a = Admin[i];
    const id = i;
    const username =  a.Username;
    const email =  a.Email;
    
    data.push({
      id,
      username,
      email,
    });
  }
  return data;
};