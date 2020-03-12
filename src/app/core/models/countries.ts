export type countries = country[];

export interface Countries {
    countries: countries;
}
  
export type country = {
    guid: string,
    uname: string,
    field_data: [],
    name: string,
    lang_code: string,
    is_default: number,
    is_active: number
}