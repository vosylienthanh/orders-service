import { sumBy } from 'lodash';
import { CommonHelper } from '../../commons/common.helper';
import { ORDERS_STATUS } from '../../commons/constants';
import { OrdersDocument } from '../../schemas';
import { SaleProductEntity } from '../sale-product/sale-product.entity';
import { IOrders } from './interfaces/orders.interface';

export class OrdersEntity {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  private _customerId: string;
  public get customerId(): string {
    return this._customerId;
  }
  public set customerId(value: string) {
    this._customerId = value;
  }
  private _totalPrice: number;
  public get totalPrice(): number {
    return this._totalPrice;
  }
  public set totalPrice(value: number) {
    this._totalPrice = value;
  }
  private _shippingAddress: string;
  public get shippingAddress(): string {
    return this._shippingAddress;
  }
  public set shippingAddress(value: string) {
    this._shippingAddress = value;
  }
  private _billingAddress: string;
  public get billingAddress(): string {
    return this._billingAddress;
  }
  public set billingAddress(value: string) {
    this._billingAddress = value;
  }

  private _status: ORDERS_STATUS;
  public get status(): ORDERS_STATUS {
    return this._status;
  }
  public set status(value: ORDERS_STATUS) {
    this._status = value;
  }

  private _saleProducts: SaleProductEntity[];
  public get saleProducts(): SaleProductEntity[] {
    return this._saleProducts;
  }
  public set saleProducts(value: SaleProductEntity[]) {
    this._saleProducts = value;
    this.totalPrice = sumBy(this._saleProducts, (value) => value.totalPrice);
  }

  private _createdAt: Date;
  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }
  private _updatedAt: Date;
  public get updatedAt(): Date {
    return this._updatedAt;
  }
  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  static fromDB(data?: OrdersDocument): OrdersEntity | null {
    if (!data) {
      return null;
    }

    const record = new OrdersEntity();
    record.id = data._id;
    record.customerId = data.customerId;
    record.totalPrice = data.totalPrice;
    record.shippingAddress = data.shippingAddress;
    record.billingAddress = data.billingAddress;
    record.status = data.status;
    record.createdAt = data.createdAt;
    record.updatedAt = data.updatedAt;

    return record;
  }

  toDto(): Partial<IOrders> {
    const dto: IOrders = {
      _id: this.id,
      customerId: this.customerId,
      totalPrice: this.totalPrice,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return CommonHelper.clearNilProperties(dto);
  }
}
