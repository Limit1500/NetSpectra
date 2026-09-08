export interface DbUserType {
  username: string;
  password: string;
  email: string;

  id: number;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

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
