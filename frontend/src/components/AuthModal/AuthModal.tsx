import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useAction } from "../../context/ActionContext";
import {
  login as loginService,
  register as registerService,
} from "../../services/auth";

import styles from "./AuthModal.module.css";

function AuthModal() {
  const {
    isOpen,
    mode,
    closeModal,
    switchMode,
  } = useModal();

  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

    const { runPendingAction } =
  useAction();

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const resetFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response =
        await loginService(
          email,
          password
        );

      login(
  response.data.token,
  response.data.user
);

runPendingAction();

resetFields();

closeModal();
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister =
    async () => {
      if (
        password !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

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

runPendingAction();

resetFields();

closeModal();
      } catch (error: any) {
        alert(
          error?.response?.data?.message ||
            "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className={styles.overlay}
      onClick={closeModal}
    >
      <div
        className={styles.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <h1>
          {mode === "login"
            ? "Welcome Back"
            : "Create Account"}
        </h1>

        <p>
          {mode === "login"
            ? "Login to continue your journey."
            : "Join NextRec today."}
        </p>

        {mode ===
          "register" && (
          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
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
        />

        {mode ===
          "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />
        )}

        <button
          disabled={loading}
          onClick={
            mode === "login"
              ? handleLogin
              : handleRegister
          }
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Register"}
        </button>

        <p>
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <span
          className={styles.link}
          onClick={switchMode}
        >
          {mode === "login"
            ? "Register"
            : "Login"}
        </span>
      </div>
    </div>
  );
}

export default AuthModal;