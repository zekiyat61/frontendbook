import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setsignup] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!username || !email || !password) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/signup`, { username, email, password });
      enqueueSnackbar("Sign Up Successfully", { variant: "success" });
      setsignup(true)
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error messages
        enqueueSnackbar(error.response.data.message || "Sign Up failed", { variant: "error" });
      } else {
        enqueueSnackbar("An unexpected error occurred", { variant: "error" });
      }
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mx-4 my-4">Sign Up</h1>
      <div className="p-4">
        <form onSubmit={handleSignUp}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="new-password"
            />
          </div>
        {
          signup &&
            <p style={{
              textAlign:"center",
              color:"blue",
              fontSize:"25px"
            }}>Verfication email sent to your email</p>
        }
          <button className="btn btn-primary mt-3" type="submit">
            Sign Up
          </button>
        </form>
        <div>
          <p className="mx-4 mt-3">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;