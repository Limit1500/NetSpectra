export interface LoginBody {
  username: string;
  password: string;
  rememberUser: boolean;
}

export interface SigninBody {
  username: string;
  password: string;
  email: string;
}
