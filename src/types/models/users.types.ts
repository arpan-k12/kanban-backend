export interface UsersAttributes {
  id: string;
  role: "0" | "1";
  user_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UsersCreateAttributes = Partial<UsersAttributes>;
