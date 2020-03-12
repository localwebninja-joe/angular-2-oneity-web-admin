import { Countries } from './countries';
import { userRegistrationFields } from './userRegistrationFields';

export interface Settings {
    menus: Menus;
}
export type Menus = menu[];
  
export interface menu {
  name : string,
  link : string,
  icon : string
}