import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login as loginService } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginService(
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
        error?.response?.data?.message ||
          "Login failed"
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
          justifyContent: "center",
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
          <h1>Login</h1>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Register
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

export default Login;