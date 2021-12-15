import { PRODUCT_UNIT } from 'src/commons/constants';

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  salePrice?: number;
  importPrice?: number;
  unit?: PRODUCT_UNIT;
  weight?: number;
  volume?: number;
  image?: string;
}
