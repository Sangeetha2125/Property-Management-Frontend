export type UnitSchema = {
    id: number,
    name: string,
    floor: number,
    squareFootage: number,
    bedrooms: number,
    bathrooms: number,
    description: string
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