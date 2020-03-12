
export type languages = Language[];

export interface Languages {
    languages: languages;
}
// export type Languages = language[];
  
export type Language = {
    guid: string,
    uname: string,
    field_data: [],
    name: string,
    lang_code: string,
    is_default: string,
    is_active: string
}