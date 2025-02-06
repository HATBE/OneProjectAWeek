export type OTPAuthData = {
  type: string;
  label: string;
  secret: string;
  issuer?: string;
  algorithm?: string;
  digits?: number;
  period?: number;
  counter?: number;
};
