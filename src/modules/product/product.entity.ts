import { CommonHelper } from '../../commons/common.helper';
import { PRODUCT_UNIT } from '../../commons/constants';
import { ProductDocument } from '../../schemas';
import { IProduct } from './interfaces/product.interface';

export class ProductEntity {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  private _sku: string;
  public get sku(): string {
    return this._sku;
  }
  public set sku(value: string) {
    this._sku = value;
  }
  private _salePrice?: number;
  public get salePrice(): number {
    return this._salePrice;
  }
  public set salePrice(value: number) {
    this._salePrice = value;
  }
  private _importPrice?: number;
  public get importPrice(): number {
    return this._importPrice;
  }
  public set importPrice(value: number) {
    this._importPrice = value;
  }
  private _unit?: PRODUCT_UNIT;
  public get unit(): PRODUCT_UNIT {
    return this._unit;
  }
  public set unit(value: PRODUCT_UNIT) {
    this._unit = value;
  }
  private _weight?: number;
  public get weight(): number {
    return this._weight;
  }
  public set weight(value: number) {
    this._weight = value;
  }
  private _volume?: number;
  public get volume(): number {
    return this._volume;
  }
  public set volume(value: number) {
    this._volume = value;
  }
  private _image?: string;
  public get image(): string {
    return this._image;
  }
  public set image(value: string) {
    this._image = value;
  }

  static fromDB(data?: ProductDocument): ProductEntity | null {
    if (!data) {
      return;
    }

    const productEntity = new ProductEntity();
    productEntity.id = data._id;
    productEntity.name = data.name;
    productEntity.sku = data.sku;
    productEntity.salePrice = data.salePrice;
    productEntity.importPrice = data.importPrice;
    productEntity.unit = data.unit;
    productEntity.weight = data.weight;
    productEntity.volume = data.volume;
    productEntity.image = data.image;

    return productEntity;
  }

  toDto(): Partial<IProduct> {
    const dto: IProduct = {
      _id: this.id,
      name: this.name,
      sku: this.sku,
      salePrice: this.salePrice,
      importPrice: this.importPrice,
      unit: this.unit,
      weight: this.weight,
      volume: this.volume,
      image: this.image,
    };

    return CommonHelper.clearNilProperties(dto);
  }
}
