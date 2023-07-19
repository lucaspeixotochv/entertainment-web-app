export interface IRegisterForm {
  email: string;
  password: {
    value: string;
    isVisible: boolean;
  };
  repassword: {
    value: string;
    isVisible: boolean;
  };
}

export interface IError {
  state: boolean;
  message: string[] | [];
}
