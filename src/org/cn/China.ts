import { Country, CountryCode } from "../country/index.js"
import { Place, PlaceLocation } from "@rr0/place"

export const china = new Country(CountryCode.cn, [new Place([PlaceLocation.fromDMS("35°0'N,103°0'E")])])
