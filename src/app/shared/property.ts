import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase{
  id: number;
  sellRent: number;
  name: string;
  pType: string;
  bhk: number;
  fType: string;
  price: number;
  builtArea: number;
  address: string;
  city: string;
  Image?: string;
  description?: string;
}
