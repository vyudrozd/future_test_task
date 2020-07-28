export type AddressType ={
    streetAddress?: string,
    city?: string,
    state?: string,
    zip?: string
}

export type ResponseData={
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: AddressType,
    description: string,
    [k: string]: string | number | AddressType
}

export enum SortingOrder {
    INC,
    DEC
}

export enum SortingByTypes {
    NONE = '',
    ID='id',
    FIRSTNAME = 'firstName',
    LASTNAME = 'lastName',
    EMAIL = 'email',
    PHONE = 'phone'
}
