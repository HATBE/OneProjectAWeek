import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public static isValidTOTPSecret(secret: string): boolean {
    return /^[A-Za-z2-7=]+$/.test(secret) && secret.length >= 16 && secret.length <= 64;
  }

  public static isValidName(name: string): boolean {
    return name.length >= 1 && name.length <= 32;
  }
}
