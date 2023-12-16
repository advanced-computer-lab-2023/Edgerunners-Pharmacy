import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Sidebar from "../../Components/SidebarPharm";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

const TABLE_HEAD = [
  "Picture",
  "Name",
  "Description",
  "Medicinal Use",
  "Price",
  "Quantity",
  "Sales",
  "Edit",
  "Archive/Unarchive",
];

export default function EditMedicine() {
  const [Medicine, setMedicine] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [forceEffect, setForceEffect] = useState(false);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/ViewMedPharm`;
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getMedicine");
        const medicineData = response.data;

        // Set initial state for editMode based on the status of each medicine
        const initialEditMode = {};
        medicineData.forEach((medicine) => {
          initialEditMode[medicine.Name] = false;
          initialEditMode[`unarchive_${medicine.Name}`] =
            medicine.Status === "Archived";
        });

        setMedicine(medicineData);
        setEditMode(initialEditMode);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setForceEffect(false);
  }, [forceEffect]);

  const handleToggleEdit = (name) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [name]: !prevEditMode[name],
    }));
  };

  const handleUpdate = async (p) => {
    try {
      console.log("hereeee");
      console.log(p);
      await axios.put("http://localhost:3001/updateMedicine", {
        Name: p.Name,
        Price: p.Price,
        Description: p.Description,
        MedicinalUse: p.MedicinalUse,
        Picture: p.Picture,
      });
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [p.Name]: false,
      }));
      console.log("Update request sent successfully");

      setForceEffect(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCancel = async (name) => {
    try {
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [name]: false,
      }));
      setForceEffect(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchive = async (p) => {
    try {
      const response = await axios.put("http://localhost:3001/archiveMedicine", {
        Name: p.Name,
      });

      if (response.status === 200) {
        // Update state immediately without waiting for the next render
        setMedicine((prevMedicine) =>
          prevMedicine.map((medicine) =>
            medicine.Name === p.Name
              ? { ...medicine, Status: 'Archived' }
              : medicine
          )
        );
        console.log("Archive request sent successfully");

        // If the medicine is archived, update the state to change the button to unarchive
        setEditMode((prevEditMode) => ({
          ...prevEditMode,
          [p.Name]: false,
          [`unarchive_${p.Name}`]: true,
        }));
      }
    } catch (error) {
      console.error("Error archiving data:", error);
    }
  };

  const handleUnarchive = async (p) => {
    try {
      const response = await axios.put("http://localhost:3001/unarchiveMedicine", {
        Name: p.Name,
      });

      if (response.status === 200) {
        // Update state immediately without waiting for the next render
        setMedicine((prevMedicine) =>
          prevMedicine.map((medicine) =>
            medicine.Name === p.Name
              ? { ...medicine, Status: 'Not' }
              : medicine
          )
        );
        console.log("Unarchive request sent successfully");

        // If the medicine is unarchived, update the state to change the button back to archive
        setEditMode((prevEditMode) => ({
          ...prevEditMode,
          [p.Name]: false,
          [`unarchive_${p.Name}`]: false,
        }));
      }
    } catch (error) {
      console.error("Error unarchiving data:", error);
    }
  };

  if (Medicine === null) {
    return (
      <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-28" style={{ width: '100vw' }}>
          <button className=" text-sky-600  outline  w-40  h-9  rounded-md shadow ml-16" onClick={routeChange}>Back</button>
          <div className="h-[16rem] items-center justify-center text-center space-y-4 mt-40">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>);
  } else if (Medicine.length === 0) {
    return (
      <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-28" style={{ width: '100vw' }}>
          <button className=" text-sky-600  outline  w-40  h-9  rounded-md shadow ml-16" onClick={routeChange}>Back</button>
          <div className="h-[16rem] items-center justify-center text-center space-y-4 mt-40">
            <h1>No data available.</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="outer-container">
        <div id="page-wrap">
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <div className="mt-28" style={{ width: '100vw' }}>
            <button className=" text-sky-600  outline  w-40  h-9  rounded-md shadow ml-16" onClick={routeChange}>Back</button>
            <div className="items-center flex justify-center -mt-14">
              <h2 style={{ color: '#93AFDA' }}>Edit Medicine</h2>
            </div>
            <Card className="h-full w-full">
              <table className="w-full min-w-max table-auto text-left mt-8">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Medicine.map((p, index) => {
                    const isLast = index === Medicine.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    const isEditing = editMode[p.Name] || false;

                    return (
                      <tr key={p.Name}>
                        <td className={classes}>
                          {isEditing ? (
                            <input
                              type="text"
                              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                              defaultValue={p.Picture}
                              onChange={(e) => {
                                p.Picture = e.target.value;
                              }}
                            />
                          ) : (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {p.Picture}
                            </Typography>)}
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.Name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          {isEditing ? (
                            <input
                              type="text"
                              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                              defaultValue={p.Description}
                              onChange={(e) => {
                                p.Description = e.target.value;
                              }}
                            />
                          ) : (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {p.Description}
                            </Typography>
                          )}
                        </td>
                        <td className={classes}>
                          {isEditing ? (
                            <input
                              type="text"
                              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                              defaultValue={p.MedicinalUse}
                              onChange={(e) => {
                                p.MedicinalUse = e.target.value;
                              }}
                            />
                          ) : (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {p.MedicinalUse}
                            </Typography>
                          )}
                        </td>
                        <td className={classes}>
                          {isEditing ? (
                            <input
                              type="text"
                              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                              defaultValue={p.Price}
                              onChange={(e) => {
                                p.Price = e.target.value;
                              }}
                            />
                          ) : (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {p.Price}
                            </Typography>
                          )}
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.Quantity}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.Sales}
                          </Typography>
                        </td>
                        <td className={classes}>
                          {isEditing ? (
                            <Box sx={{ display: "flex", gap: "1rem" }}>
                              <Tooltip arrow placement="right" title="Edit">
                                <IconButton
                                  color="success"
                                  onClick={() => handleUpdate(p)}
                                >
                                  <CheckIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : (
                            <Box sx={{ display: "flex", gap: "1rem" }}>
                              <Tooltip arrow placement="right" title="Edit">
                                <IconButton
                                  color="primary"
                                  onClick={() => handleToggleEdit(p.Name)}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </td>
                        <td className={classes}>
                          <Box sx={{ display: "flex", gap: "1rem" }}>
                            {editMode[`unarchive_${p.Name}`] ? (
                              // Unarchive button
                              <Tooltip arrow placement="right" title="Unarchive">
                                <IconButton color="default" onClick={() => handleUnarchive(p)}>
                                  <UnarchiveIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              // Archive button
                              <Tooltip arrow placement="right" title="Archive">
                                <IconButton color="default" onClick={() => handleArchive(p)}>
                                  <ArchiveIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </td>
                        <td className={classes}>
                          {isEditing ? (
                            <Box sx={{ display: "flex", gap: "1rem" }}>
                              <Tooltip arrow placement="right" title="Cancel">
                                <IconButton
                                  color="blue"
                                  onClick={() => handleCancel(p.Name)}
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : (
                            <div></div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}