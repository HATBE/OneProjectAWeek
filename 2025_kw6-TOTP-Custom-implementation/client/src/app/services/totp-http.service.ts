import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TotpHttpService {
  constructor(protected http: HttpClient) {}

  /*public async getTotp() {
    try {
      const data = await firstValueFrom(
        this.http.get<any>(`http://localhost:3000/JBSWY3DPEHPK3PXP`)
      );
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }*/
}
