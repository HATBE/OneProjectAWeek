import { Injectable } from '@angular/core';

export interface OTPAuthData {
  type: string;
  label: string;
  secret: string;
  issuer?: string;
  algorithm?: string;
  digits?: number;
  period?: number;
  counter?: number;
}

@Injectable({
  providedIn: 'root',
})
export class OtpAuthParseService {
  public static parseOTPAuthURL(url: string): OTPAuthData | null {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.protocol !== 'otpauth:') {
        throw new Error('Invalid protocol');
      }

      const type = parsedUrl.host;
      const label = decodeURIComponent(parsedUrl.pathname).slice(1); // Remove leading '/'
      const params = parsedUrl.searchParams;

      const secret = params.get('secret') ?? undefined;
      if (!secret) {
        throw new Error('Missing secret');
      }

      const issuer = params.get('issuer') ?? undefined;
      const algorithm = params.get('algorithm') ?? 'SHA1';
      const digits = params.get('digits') ? parseInt(params.get('digits')!) : 6;
      const period = params.get('period') ? parseInt(params.get('period')!) : 30;
      const counter = params.get('counter') ? parseInt(params.get('counter')!) : undefined;

      return {
        type,
        label,
        secret,
        issuer,
        algorithm,
        digits,
        period,
        counter,
      };
    } catch (error) {
      console.error('Error parsing OTPAuth URL:', error);
      return null;
    }
  }
}
