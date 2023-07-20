import React, { useState, useContext } from "react";
import S from "../auth.module.scss";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../../components/Loading";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: {
      value: "",
      isVisible: false,
    },
  });

  const [error, setError] = useState({
    state: false,
    message: "",
  });

  const [loader, setLoader] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, form.email, form.password.value)
      .then((userCredential) => {
        error &&
          setError({
            state: false,
            message: "",
          });
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setLoader(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        setError({
          state: true,
          message:
            "Invalid Credentials. Please check your username and password and try again.",
        });
        console.log(error);
      });
  };
  return (
    <div className={S.authContainer}>
      <img src="/logo.png" alt="Logo" className={S.authContainer__image} />
      <div className={S.container}>
        <h3 className={S.container__title}>Login</h3>
        <form className={S.container__form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email addres"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className={S.container__passwordContainer}>
            <input
              type={form.password.isVisible ? "text" : "password"}
              placeholder="Password"
              value={form.password.value}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: { ...form.password, value: e.target.value },
                })
              }
            />
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  password: {
                    ...form.password,
                    isVisible: !form.password.isVisible,
                  },
                })
              }
            >
              {form.password.isVisible ? (
                <FaEyeSlash size={24} color="#8A8E97" />
              ) : (
                <FaEye size={24} color="#8A8E97" />
              )}
            </button>
          </div>
          <button type="submit" className={S.container__form__btn}>
            {loader ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading />
              </div>
            ) : (
              <span>Login to your account</span>
            )}
          </button>
        </form>
        <div className={S.callContainer}>
          <p className={S.callContainer__text}>Don't have an account?</p>
          <Link to={"/register"} className={S.callContainer__page}>
            <span>Sign Up</span>
          </Link>
        </div>
        {error.state && <p className={S.errorMsg}>* {error.message}</p>}
      </div>
    </div>
  );
}

export default Login;
