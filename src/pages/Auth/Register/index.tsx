import React, { useState, useEffect } from "react";
import S from "../auth.module.scss";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../../components/Loading";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: {
      value: "",
      isVisible: false,
    },
    repassword: {
      value: "",
      isVisible: false,
    },
  });
  const [error, setError] = useState({
    state: false,
    message: [] as string[],
  });
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError({
      state: false,
      message: [],
    });

    const emptyValid = EmptyValidation();
    const passwordValid = passwordValidation();

    if (emptyValid && passwordValid) {
      createUserWithEmailAndPassword(auth, form.email, form.password.value)
        .then(() => {
          setLoader(true);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const passwordValidation = () => {
    if (form.password.value !== form.repassword.value) {
      setError((prevState) => ({
        ...prevState,
        state: true,
        message: [...prevState.message, "Mismatched passwords"],
      }));
      return false;
    } else {
      return true;
    }
  };

  const EmptyValidation = () => {
    if (
      form.email.trim().length === 0 ||
      form.password.value.trim().length === 0 ||
      form.repassword.value.trim().length === 0
    ) {
      setError((prevState) => ({
        ...prevState,
        state: true,
        message: [...prevState.message, "All fields must be filled!"],
      }));
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className={S.authContainer}>
      <img src="/logo.png" alt="Logo" className={S.authContainer__image} />
      <div className={S.container}>
        <h3 className={S.container__title}>Register</h3>
        <form className={S.container__form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email addres"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={S.container__form__input}
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
          <div className={S.container__passwordContainer}>
            <input
              type={form.repassword.isVisible ? "text" : "password"}
              placeholder="Password"
              value={form.repassword.value}
              onChange={(e) =>
                setForm({
                  ...form,
                  repassword: { ...form.repassword, value: e.target.value },
                })
              }
            />
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  repassword: {
                    ...form.repassword,
                    isVisible: !form.repassword.isVisible,
                  },
                })
              }
            >
              {form.repassword.isVisible ? (
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
              <span>Create your account</span>
            )}
          </button>
        </form>
        <div className={S.callContainer}>
          <p className={S.callContainer__text}>Already have an account?</p>
          <Link to={"/"} className={S.callContainer__page}>
            <span>Login</span>
          </Link>
        </div>
        <div>
          {error.state &&
            error.message.map((errorMsg, index) => (
              <p key={index} className={S.errorMsg}>
                * {errorMsg}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Register;
