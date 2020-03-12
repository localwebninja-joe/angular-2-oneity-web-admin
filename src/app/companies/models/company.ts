export interface Company {
  id: string;
  companyInfo: {
    name: string;
    address: string;
    country: string;
    state: string;
    city: string;
    poBox: string;
    phone: string;
    fax: string;
    email: string;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

export function generateMockCompany(): Company {
  return {
    id: '1',
    companyInfo: {
      name: 'title',
      address: 'address',
      country: 'country',
      state: 'state',
      city: 'city',
      poBox: 'poBox',
      phone: 'phone',
      fax: 'fax',
      email: 'email',
      imageLinks: {
        thumbnail: 'string',
        smallThumbnail: 'string',
      },
    },
  };
}
