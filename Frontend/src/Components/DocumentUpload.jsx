import React, { useState } from "react";
import "./documentstyle.css";
import Card from "../UI/Card";
import Logo from "../UI/Logo";
import '../../src/';
import { Line } from "rc-progress";
import Upload from "rc-upload";
import axios from "axios";

export default function DocumentUpload() {
  const [idFile, setIdFile] = useState(null);
  const [pharmacyDegreeFile, setPharmacyDegreeFile] = useState(null);
  const [workingLicensesFile, setWorkingLicensesFile] = useState(null);
  const [idPercentage, setIdPercentage] = useState(0);
  const [pharmacyDegreePercentage, setPharmacyDegreePercentage] = useState(0);
  const [workingLicensesPercentage, setWorkingLicensesPercentage] = useState(0);
  const [idFileName, setIdFileName] = useState();
  const [pharmacyDegreeFileName, setPharmacyDegreeFileName] = useState();
  const [workingLicensesFileName, setWorkingLicensesFileName] = useState();
  const [idFileSize, setIdFileSize] = useState();
  const [pharmacyDegreeFileSize, setPharmacyDegreeFileSize] = useState();
  const [workingLicensesFileSize, setWorkingLicensesFileSize] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const createUploadProps = (fileType, setFile, setPercentage, setFileName, setFileSize) => ({
    customRequest({
      action,
      file,
      onSuccess,
      onError,
      onProgress,
    }) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:3001/addDocument", formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            onProgress({ percent: percentCompleted });
          },
        })
        .then((response) => {
          onSuccess(response, file);
        })
        .catch((error) => {
          onError(error);
        });
    },
    accept: ".png, .pdf, .txt",
    beforeUpload(file) {
      setFile(file);
      setIsUploading(true);
      setFileName(file.name);
      setFileSize(Math.floor(file.size / 1000));
    },
    onSuccess() {
      setIsUploading(false);
    },
    onProgress(step) {
      setPercentage(Math.round(step.percent));
    },
    onError(err) {
      console.log(`onError for ${fileType}`, err);
    },
  });

  const handleSubmit = () => {
    // You can add your submission logic here using Axios to post the files to the server.
    // For example:
    const formData = new FormData();
    formData.append("idFile", idFile);
    formData.append("pharmacyDegreeFile", pharmacyDegreeFile);
    formData.append("workingLicensesFile", workingLicensesFile);

    axios
      .post("http://localhost:3001/addDocument", formData)
      .then((response) => {
        console.log("Submission successful", response);
      })
      .catch((error) => {
        console.error("Submission failed", error);
      });
  };

  return (
    <div className="justify-center flex mt-20">


      <Card width='w-4/12' height=' h-[30rem]'>
        <div className=" flex justify-center  mt-6 mb-0 ">
          <a href="/ViewMedPharm"><Logo height='4rem' /></a>
          <h1 className=" text-2xl font-bold  text-center  text-sky-600  ml-0  mt-6">  Upload Documents </h1>
        </div >
        <div className="justify-center mt-12 ml-7 space-y-5">

          <div className="upload-container">
            <Upload {...createUploadProps("ID", setIdFile, setIdPercentage, setIdFileName, setIdFileSize)}>
              <button className="font-poppins-font text-center  bg-sky-600 text-white  outline  w-72  h-12 rounded-md   mt-2 shadow">Upload ID</button>
            </Upload>

            {idFileName && (
              <div className="upload-details">
                <div className="file-name">
                  <b>{idFileName}</b>
                </div>
                <div className="progress-container">
                  <Line
                    percent={idPercentage}
                    strokeWidth={9}
                    trailWidth={9}
                    trailColor="#FFF"
                    strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
                  />
                  <div className="progress-text">
                    {isUploading ? `Uploading ${idPercentage}% ` : `Finished`}
                  </div>
                </div>
                <div className="file-size">{`${idFileSize} KB`}</div>
              </div>
            )}
          </div>

          <div className="upload-container">
            <Upload {...createUploadProps("PharmacyDegree", setPharmacyDegreeFile, setPharmacyDegreePercentage, setPharmacyDegreeFileName, setPharmacyDegreeFileSize)}>
              <button className="font-poppins-font text-center  bg-sky-600 text-white  outline  w-72  h-12 rounded-md   mt-2 shadow">Upload Pharmacy Degree</button>
            </Upload>

            {pharmacyDegreeFileName && (
              <div className="upload-details">
                <div className="file-name">
                  <b>{pharmacyDegreeFileName}</b>
                </div>
                <div className="progress-container">
                  <Line
                    percent={pharmacyDegreePercentage}
                    strokeWidth={9}
                    trailWidth={9}
                    trailColor="#FFF"
                    strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
                  />
                  <div className="progress-text">
                    {isUploading ? `Uploading ${pharmacyDegreePercentage}% ` : `Finished`}
                  </div>
                </div>
                <div className="file-size">{`${pharmacyDegreeFileSize} KB`}</div>
              </div>
            )}
          </div>

          <div className="upload-container">
            <Upload {...createUploadProps("WorkingLicenses", setWorkingLicensesFile, setWorkingLicensesPercentage, setWorkingLicensesFileName, setWorkingLicensesFileSize)}>
              <button className="font-poppins-font text-center  bg-sky-600 text-white  outline  w-72  h-12 rounded-md   mt-2 shadow">Upload Working Licenses</button>
            </Upload>

            {workingLicensesFileName && (
              <div className="upload-details">
                <div className="file-name">
                  <b>{workingLicensesFileName}</b>
                </div>
                <div className="progress-container">
                  <Line
                    percent={workingLicensesPercentage}
                    strokeWidth={9}
                    trailWidth={9}
                    trailColor="#FFF"
                    strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
                  />
                  <div className="progress-text">
                    {isUploading ? `Uploading ${workingLicensesPercentage}% ` : `Finished`}
                  </div>
                </div>
                <div className="file-size">{`${workingLicensesFileSize} KB`}</div>
              </div>
            )}
          </div>
          <div className="mt-30">
            <button onClick={handleSubmit} className="font-poppins-font text-center text-sky-600 outline w-40 h-9 rounded-md mt-7 shadow ml-16">Submit</button>
          </div>
        </div>
      </Card>
    </div>
  );
}