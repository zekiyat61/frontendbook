import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/user/login`, { username, password })
      .then((response) => {
        const { username } = response.data;
        console.log("Username:", username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);
        enqueueSnackbar("Login Successfully " , { variant: "success" });
        navigate("/home", { state: { username } });
      })
      .catch((error) => {
        enqueueSnackbar("Login failed "+error.response.data.message, { variant: "error" });
        console.error(error.response.data.message);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button className="btn btn-primary btn-block mt-3" onClick={handleLogin}>
                    Login
                </button>
                <div className="text-center mt-3">
                    <p>
                        Do not have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
      </div>
  );
};

export default Login;
