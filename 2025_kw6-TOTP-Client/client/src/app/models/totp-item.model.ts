export type TotpItem = {
  id: string;
  name: string;
  secret: string;
};

export type TotpItemForm = Omit<TotpItem, 'id'> & { id?: string };
