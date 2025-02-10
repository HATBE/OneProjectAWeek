import { Injectable } from '@angular/core';
import jsSHA from 'jssha';
import { TotpToken } from '../models/totp-token.model';
import { TotpItem } from '../models/totp-item.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TotpService {
  private period = 30;
  private storageKey = 'todo-items';

  private base32tohex(base32: string): string {
    const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const cleanBase32 = base32.replace(/=+$/, '').toUpperCase();

    const bits = [...cleanBase32]
      .map((char) => {
        const val = base32chars.indexOf(char);
        if (val === -1) throw new Error('Invalid base32 character in secret');
        return val.toString(2).padStart(5, '0');
      })
      .join('');

    return (
      bits
        .match(/.{8}/g)
        ?.map((byte) => parseInt(byte, 2).toString(16).padStart(2, '0'))
        .join('') || ''
    );
  }

  public getPeriod(): number {
    return this.period;
  }

  public deleteById(id: string): void {
    const itemsBefore = localStorage.getItem(this.storageKey);

    try {
      let items: TotpItem[] = JSON.parse(itemsBefore ?? '[]');

      items = items.filter((item) => item.id !== id);

      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  public create(name: string, secret: string): void {
    const newItem: TotpItem = { id: uuidv4(), name, secret };
    const itemsBefore = localStorage.getItem(this.storageKey);

    try {
      const items: TotpItem[] = JSON.parse(itemsBefore ?? '[]');

      items.push(newItem);

      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }

  public renameById(id: string, name: string) {
    const itemsBefore = localStorage.getItem(this.storageKey);

    try {
      let items: TotpItem[] = JSON.parse(itemsBefore ?? '[]');

      items = items.map((item) => {
        if (item.id === id) {
          return { ...item, name };
        }
        return item;
      });

      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  public getAll(): TotpItem[] {
    const items = localStorage.getItem(this.storageKey);

    if (!items) {
      return [];
    }

    try {
      return JSON.parse(items);
    } catch (error) {
      console.error('Error parsing items:', error);
      return [];
    }
  }

  public generateTOTP(secret: string): TotpToken {
    const timestamp = Math.floor(Date.now() / 1000);

    let time = Math.round(Math.floor(timestamp / this.period))
      .toString(16)
      .padStart(2, '0')
      .padStart(16, '0');

    const sha = new jsSHA('SHA-1', 'HEX');

    sha.setHMACKey(this.base32tohex(secret), 'HEX');
    sha.update(time);

    const hmac = sha.getHMAC('HEX');

    const offset = parseInt(hmac.slice(-1), 16);

    let otp = (
      parseInt(hmac.slice(offset * 2, offset * 2 + 8), 16) & parseInt('7fffffff', 16)
    ).toString();

    const start = Math.max(otp.length - 6, 0);

    const token = otp.substring(start, start + 6).padStart(6, '0');

    const exp = (Math.floor(timestamp / this.period) + 1) * this.period;

    return { token, exp };
  }
}
