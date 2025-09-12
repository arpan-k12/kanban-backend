export interface OtpAttributes {
  id: string;
  user_id?: string | null;
  otp: string;
  expiry: Date;
  user_name?: string | null;
  email?: string | null;
  password?: string | null;
  role?: "0" | "1" | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type OtpCreateAttributes = Partial<OtpAttributes>;
