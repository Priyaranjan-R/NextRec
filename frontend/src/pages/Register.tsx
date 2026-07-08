import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register as registerService } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async () => {
      try {
        setLoading(true);

        const response =
          await registerService(
            username,
            email,
            password
          );

        login(
          response.data.token,
          response.data.user
        );

        navigate("/");
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <MainLayout>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "420px",
            padding: "35px",
            borderRadius: "15px",
            background: "#151B2F",
            color: "white",
          }}
        >
          <h1>Register</h1>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            style={buttonStyle}
            onClick={
              handleRegister
            }
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </button>

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Register;