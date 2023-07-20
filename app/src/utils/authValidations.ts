import { IError, IRegisterForm } from "../types/Auth.types";

export const passwordValidation = (
  form: IRegisterForm,
  setError: React.Dispatch<React.SetStateAction<IError>>
) => {
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

export const EmptyValidation = (
  form: IRegisterForm,
  setError: React.Dispatch<React.SetStateAction<IError>>
) => {
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
