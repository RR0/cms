import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry"
import { Place, PlaceLocation } from "@rr0/place"

export const china = new CmsCountry(CountryCode.cn, [new Place([PlaceLocation.fromDMS("35°0'N,103°0'E")])])
