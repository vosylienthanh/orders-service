import { CommonHelper } from '../../commons/common.helper';
import { SaleProductDocument } from '../../schemas';
import { ISaleProduct } from './interfaces/sale-product.interface';

export class SaleProductEntity {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  private _productId: string;
  public get productId(): string {
    return this._productId;
  }
  public set productId(value: string) {
    this._productId = value;
  }

  private _ordersId: string;
  public get ordersId(): string {
    return this._ordersId;
  }
  public set ordersId(value: string) {
    this._ordersId = value;
  }

  private _price: number = 0;
  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }
  private _discount?: number = 0;
  public get discount(): number {
    return this._discount;
  }
  public set discount(value: number) {
    this._discount = value;
  }
  private _amount: number = 0;
  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
  }

  public get totalPrice(): number {
    return this._amount * this._price;
  }

  static fromDB(data?: SaleProductDocument): SaleProductEntity | null {
    if (!data) {
      return null;
    }

    const record = new SaleProductEntity();
    record.id = data._id;
    record.amount = data.amount;
    record.productId = data.productId;
    record.ordersId = data.ordersId;
    record.price = data.price;
    record.discount = data.discount;

    return record;
  }

  toDto(): Partial<ISaleProduct> {
    const dto: ISaleProduct = {
      _id: this.id,
      amount: this.amount,
      productId: this.productId,
      ordersId: this.ordersId,
      price: this.price,
      discount: this.discount,
    };

    return CommonHelper.clearNilProperties(dto);
  }
}
