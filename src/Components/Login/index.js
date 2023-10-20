import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { MdClose } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const cookies = new Cookies();
  const adminUid = "bsR73uiraU0bmWlI8kDw";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post("https://we-safe-partner-portal-backend1.onrender.com/partnerUsers/login",{partnerUserEmail:email,password:password},{
    //   "headers":{
    //     "Content-Type":"application/json"
    //   }
    // })
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/partnerUsers/login",
        { partnerUserEmail: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // axios.post("http://localhost:1902/partnerUsers/login",{partnerUserEmail:email,password:password},{
      //   "headers":{
      //     "Content-Type":"application/json"
      //   }
      // })
      .then((res) => {
        // cookies.set("loggedInPartnerUser",res.data.partner[0].partnerUid)
        // cookies.set("token",res.data.token,{
        //   expires: new Date(Date.now()+18000000)
        // })
        cookies.set("loggedInPartnerUser", res.data.partner[0].partnerUid);
        cookies.set("token", res.data.token, {
          expires: new Date(Date.now() + 18000000),
        });
        cookies.set("type", res.data.partner[0].type);
        if (res.data.message === "logged in successfully") {
          // window.location.reload()
          // navigate("/home")
          // if(cookies.get("type")==="admin"){
          //   navigate("/admin")
          // }
          cookies.get("loggedInPartnerUser");
          navigate("/home");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.message);
        setInvalid(!invalid);
      });
  };

  const toggleInvalid = () => {
    setInvalid(!invalid);
  };
  return (
    <div>
      <div>
        <form
          style={{ paddingTop: "15%" }}
          onSubmit={handleSubmit}
          className="app__form"
        >
          <h2
            className="head-text"
            style={{ margin: "auto", marginBottom: "20px" }}
          >
            Please <span>Log In</span> To Continue{" "}
          </h2>
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            label="Email Id"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ marginTop: "20px" }}
            className="form__text"
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="btn p-text"
            variant="outlined"
            style={{ width: "100px", margin: "auto", marginTop: "20px" }}
            type="submit"
          >
            Log In
          </Button>
        </form>
      </div>
      {invalid && (
        <div className="modal">
          <div className="overlay" onClick={toggleInvalid}></div>
          <div>
            <form onSubmit={toggleInvalid} className="modal-content">
              <MdClose
                onClick={toggleInvalid}
                style={{
                  color: "#313bac",
                  height: "1.2rem",
                  width: "1.3rem",
                  marginLeft: "300px",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
              />
              <h3 style={{ margin: "auto" }}>Invalid Credentials. Try Again</h3>
              <Button
                className="btn p-text close-modal"
                variant="outlined"
                style={{
                  width: "150px",
                  marginTop: "20px",
                  marginLeft: "30%",
                  backgroundColor: "#313bac",
                  color: "white",
                  marginBottom: "20px",
                }}
                type="submit"
              >
                Try Again
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
