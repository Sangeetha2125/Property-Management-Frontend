export type UserSchema = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: string
}

export type UnitSchema = {
    id: number,
    name: string,
    floor: number,
    squareFootage: number,
    bedrooms: number,
    bathrooms: number,
    description: string,
    availability:string,
    property: PropertySchema,
    soldTo: UserSchema|null
}

export type PropertySchema = {
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    pincode: string,
    numUnits: number,
    type: string,
    owner: UserSchema,
}

export type UnitAvailabilitySchema = {
    id: number,
    unit: UnitSchema,
    availabilityType: string,
    amount: number,
    securityDeposit: number|null,
    monthlyDue: number|null,
    noOfMonths: number|null,
}

export type UnitRequestSchema = {
    id: number,
    unit: UnitSchema,
    user: UserSchema,
    type: string,
    message: string,
    monthlyDue: number|null,
    amount: number,
    securityDeposit: number|null,
    status: string,
    noOfMonths: number|null,
    requestDate: string
}

export type AgreementSchema = {
    id: number,
    request: UnitRequestSchema,
    startDate: string,
    endDate: string|null,
    numberOfYears: number|null
}