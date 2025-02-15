import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import logo from "../assets/logo.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context/Context";
import { decodeToken } from "../Utilis/Decodedtoken.utilis";

function Login() {
  const { setUserToken } = useGlobalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("https://main-server-zeta.vercel.app/staffLogin", { email, password });
      if (response.data.status === 200) {
        Cookies.set("token", response.data.token,{ expires: 24 / 24 });
        Cookies.set("id", response.data.id,{ expires: 24 / 24 });
        setUserToken(response.data.token);

        const user = decodeToken(response.data.token);
        const userRole = user?.designation;
console.log(response)
        if (userRole === "admin") {
          navigate("/");
        } else if (userRole === "Staff") {
          navigate("/physicalform");
        } else {
          setErrorMessage("Unauthorized role");
          setOpenSnackbar(true);
        }
      }
    } catch (error) {
      if (error.response?.data?.status === 404) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="col-lg-5 col-md-7 col-sm-12">
          <div className="mb-5 d-flex justify-content-center align-items-center">
            <img src={logo} width={200} alt="Logo" />
          </div>
          <div>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              className="mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleLogin}
              disabled={loading}
              className="py-3"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </div>
        </div>
      </div>

      {/* Snackbar for error messages */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
