export interface OtpAttributes {
  id: string;
  user_id: string;
  otp: string;
  expiry: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type OtpCreateAttributes = Partial<OtpAttributes>;
