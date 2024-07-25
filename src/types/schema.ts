export type UnitSchema = {
    id: number,
    name: string,
    floor: number,
    squareFootage: number,
    bedrooms: number,
    bathrooms: number,
    description: string,
    availability:string,
    property: PropertySchema
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
    owner: Object,
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