import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./style.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setdob] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [gender, setgender] = useState("");
  const [partnerUid, setpartnerUid] = useState("");
  const [userUid, setuserUid] = useState("");
  const [childListUid, setchildList] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblBhcnRuZXJVc2VyIjp7ImlkIjoiZ3RxNzRIMGtkN3d1azBpVW02aTUifSwiaWF0IjoxNjc3MDUyMjc0fQ.BD1uEUK1gg0_mD8qN6_o-pYgTpJF9m-2YXLar0VIcGI";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/customers",
        {
          name,
          address,
          dob,
          partnerUid,
          childListUid,
          userUid,
          gender,
          bloodGroup,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("/");
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="app__form">
          <h3 className="head-text">
            Create A <span>New</span> Customer{" "}
          </h3>

          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            label="Enter Gender"
            type="text"
            onChange={(e) => setgender(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            label="Enter DOB"
            type="date"
            onChange={(e) => setdob(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Enter Blood Group"
            onChange={(e) => setbloodGroup(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Enter Partner Id"
            onChange={(e) => setpartnerUid(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Enter User Uid"
            onChange={(e) => setuserUid(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Enter Child List Uid"
            onChange={(e) => setchildList(e.target.value)}
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

export default AddCustomer;
