export interface DatabaseUserType {
  username: string;
  password: string;
  email: string;

  id: number;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
