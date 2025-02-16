import { Place } from "@rr0/place"
import { CoteDOrCityCode } from "../CoteDOrCityCode.js"
import { coteDOr } from "../CoteDOr"
import { City } from "../../../../../../country"

export const vitteaux = City.create(String(CoteDOrCityCode.Vitteaux), coteDOr, Place.fromDMS("47°23′55″N,4°32′33″E"))
