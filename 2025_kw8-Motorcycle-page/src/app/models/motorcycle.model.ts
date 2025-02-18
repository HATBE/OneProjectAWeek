export type Motorcycle = {
  id?: string;
  name: string;
  make: string;
  model: string;
  productionYear: number;
  ccm: number;
  imageUrlBase64: string;
  odoFromKm: number | null;
  odoCurrentKm: number | null;
  dateOfPurchase: Date;
  dateNoLongerOwned: Date | null;
};
