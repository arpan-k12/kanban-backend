import axios from "axios";

export interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export class RecaptchaVerifier {
  private secretKey: string;

  constructor(secretKey?: string) {
    this.secretKey = secretKey || process.env.RECAPTCHA_SECRET_KEY || "";
    if (!this.secretKey) {
      throw new Error("RECAPTCHA_SECRET_KEY is not defined");
    }
  }

  async verify(token: string): Promise<RecaptchaResponse> {
    if (!token) {
      throw new Error("reCAPTCHA token is missing");
    }

    const url = "https://www.google.com/recaptcha/api/siteverify";
    const params = new URLSearchParams({
      secret: this.secretKey,
      response: token,
    });

    const { data } = await axios.post<RecaptchaResponse>(url, params);
    return data;
  }
}
