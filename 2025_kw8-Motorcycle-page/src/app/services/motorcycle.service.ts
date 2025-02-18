import { Injectable } from '@angular/core';
import { Motorcycle } from '../models/motorcycle.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleService {
  private storageKey = 'motorcycles';

  public deleteById(id: string): void {
    const itemsBefore = localStorage.getItem(this.storageKey);

    try {
      let items: Motorcycle[] = JSON.parse(itemsBefore ?? '[]');

      items = items.filter((item) => item.id !== id);

      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  public getById(id: string): Motorcycle | null {
    const itemsBefore = localStorage.getItem(this.storageKey);

    try {
      let items: Motorcycle[] = JSON.parse(itemsBefore ?? '[]');

      return items.find((i) => i.id === id) || null;
    } catch (error) {
      console.error('Error deleting item:', error);
    }

    return null;
  }

  public create(motorcycle: Motorcycle): void {
    const newItem: Motorcycle = {
      id: uuidv4(),
      ...motorcycle,
    };
    const itemsBefore = localStorage.getItem(this.storageKey);

    try {
      const items: Motorcycle[] = JSON.parse(itemsBefore ?? '[]');

      items.push(newItem);

      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }

  public getAll(): Motorcycle[] {
    const items = localStorage.getItem(this.storageKey);

    if (!items) {
      return [];
    }

    try {
      return JSON.parse(items);
    } catch (error) {
      console.error('Error parsing items:', error);
    }

    return [];
  }

  public createTestData() {
    localStorage.removeItem(this.storageKey);
    this.create({
      ccm: 999,
      dateNoLongerOwned: null,
      dateOfPurchase: new Date('17-07-2002'),
      imageUrlBase64: 'base64//:dsd',
      make: 'Suzuki',
      model: 'GSX-S 1000',
      name: 'Blue big Suzuki',
      odoCurrentKm: 88888,
      odoFromKm: 37000,
      productionYear: 2015,
    });

    this.create({
      ccm: 749,
      dateNoLongerOwned: null,
      dateOfPurchase: new Date('17-07-2005'),
      imageUrlBase64: 'base64//:dsd',
      make: 'Suzuki',
      model: 'GSR 750',
      name: 'Blue small Suzuki',
      odoCurrentKm: 88888,
      odoFromKm: 37000,
      productionYear: 2012,
    });
  }
}
