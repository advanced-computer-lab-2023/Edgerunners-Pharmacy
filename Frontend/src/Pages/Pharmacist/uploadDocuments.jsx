import React, { useState } from "react";
import axios from "axios";
import fileDownload from 'js-file-download';

const UploadDocuments = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]); // Updated variable name to 'files'
  const [status, setStatus] = useState("initial");
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };


  const handleUploadFiles = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("Username", sessionStorage.getItem("Username"));
      console.log(sessionStorage.getItem("Username"));
      try {
        const result = await fetch("http://localhost:3001/patientUploadFile", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
        console.log(status);
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };
  // const handleViews = async () => {
      
  //     console.log(sessionStorage.getItem("Username"));
  //     try {
  //       const result = await fetch(`http://localhost:3001/gethealthrecords/${sessionStorage.getItem("Username")}`, {
  //         method: "GET",
  //       });

  //       const data = await result.json();
  //       setData(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };










  const handleUploadRecords = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("Username", sessionStorage.getItem("Username"));
      console.log(sessionStorage.getItem("Username"));
      try {
        const result = await fetch("http://localhost:3001/patientUploadHealthRecord", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
        console.log(status);
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };
  const handleViewFiles = async (filename) => {
    await axios.get(`http://localhost:3001/viewFiles/${filename}`, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }

   return (
    <>
      <div className="input-group">
      <div>
      <button onClick={handleViews}>View Files</button>
      {/* Display file list on the screen */}
      <ul>
      {data.map((item, index) => (
      <div key={index}>
         {item.FileNames.map((fileName, i) => (
        <><li key={i}>{fileName}</li>
        <button onClick={() => handleViewFiles(fileName)}>Download</button></>
             ))}
          </div>
            ))}
      </ul>
      </div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUploadFiles} className="submit">
          Upload a file
        </button>
      )}
      

      <Result status={status} />
    </>
  );
};

const Result = ( {status} ) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
}; 

export default UploadDocuments;