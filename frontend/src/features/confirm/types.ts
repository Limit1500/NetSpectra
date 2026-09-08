export enum EmailTokenPurpose {
  patch = "patch",
  delete = "delete",
}

export type UserData = {
  username: string;
  password: string;
  email: string;

  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
