import { Input } from "@mui/material";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";

const AddDocument = () => {
  const [filename, setFilename] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hash, setHash] = useState("");

  const customerId = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData=new FormData()
    // formData.append('filename',filename)
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/upload",
        { name, filename, description, customerId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("/");
    console.log(customerId);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="app__form">
          <h3 className="head-text">
            Upload The <span>Required</span> Document
          </h3>

          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            label="Name of Document"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="file"
            onChange={(e) => setFilename(e.target.files[0])}
          />
          <Button
            className="btn p-text"
            variant="outlined"
            style={{ width: "100px", margin: "auto", marginTop: "20px" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddDocument;
