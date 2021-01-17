import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase{
  id: number;
  SellRent: number;
  Name: string;
  PType: string;
  BHK: number;
  FType: string;
  Price: number;
  BuiltArea: number;
  Address: string;
  City: string;
  RTM: number;
  Maintenance?: number;
  Possession?: string;
  Image?: string;
  Description?: string;
}
