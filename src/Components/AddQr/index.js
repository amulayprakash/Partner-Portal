import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./style.scss";

const AddQr = () => {
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  //const [hash,setHash]=useState('')
  const customerId = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        process.env.REACT_APP_BASE_URL + `/customers/${customerId.id}/qr`,
        { qrId: id, qrPin: pin },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // console.log(customerId)
    navigate("/");
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="app__form">
          <h3 className="head-text">
            Assign <span>We Safe QR Code</span> To Customer{" "}
          </h3>

          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            label="Enter QR Id"
            type="text"
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Enter QR Pin"
            onChange={(e) => setPin(e.target.value)}
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

export default AddQr;
