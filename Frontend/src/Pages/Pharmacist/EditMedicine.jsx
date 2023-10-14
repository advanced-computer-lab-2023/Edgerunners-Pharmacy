import { Card, Typography } from "@material-tailwind/react";
import GetMedicine, { DeleteMedicine } from "../getMedicine";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Logo from "../../UI/Logo";

const TABLE_HEAD = [
  "Picture",
  "Name",
  "Description",
  "Medicinal Use",
  "Price",
  "Quantity",
  "Sales",
];

export default function EditMedicine() {
  const [Medicine, setMedicine] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [forceEffect, setForceEffect] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getMedicine");
        setMedicine(response.data);
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
        Picture : p.Picture,
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

  if (Medicine === null) {
    return <div>Loading...</div>;
  } else if (Medicine.length === 0) {
    return <div>No data available.</div>;
  } else {
    return (
      <div id="outer-container">
        <div id="page-wrap">
          <div className="flex justify-center">
            <a href="/ViewMedPharm">
              <Logo height="4rem" className="mt-6 mb-0" />
            </a>
          </div>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
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
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
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
    );
  }
}
