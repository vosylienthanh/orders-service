import { CommonHelper } from '../../commons/common.helper';
import { CustomerDocument } from '../../schemas';
import { ICustomer } from './interfaces/customer.interface';

export class CustomerEntity {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  private _fullName: string;
  public get fullName(): string {
    return this._fullName;
  }
  public set fullName(value: string) {
    this._fullName = value;
  }
  private _phone: string;
  public get phone(): string {
    return this._phone;
  }
  public set phone(value: string) {
    this._phone = value;
  }
  private _address?: string;
  public get address(): string {
    return this._address;
  }
  public set address(value: string) {
    this._address = value;
  }

  static fromDB(data?: CustomerDocument): CustomerEntity | null {
    if (!data) {
      return null;
    }

    const customerEntity = new CustomerEntity();
    customerEntity.id = data._id;
    customerEntity.fullName = data.fullName;
    customerEntity.phone = data.phone;
    customerEntity.address = data.address;

    return customerEntity;
  }

  toDto(): Partial<ICustomer> {
    const dto: ICustomer = {
      _id: this.id,
      fullName: this.fullName,
      phone: this.phone,
      address: this.address,
    };

    return CommonHelper.clearNilProperties(dto);
  }
}
