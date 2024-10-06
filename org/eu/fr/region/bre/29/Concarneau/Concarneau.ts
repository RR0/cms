import { Place } from "../../../../../../../place"
import { FinistereCityCode } from "../FinistereCityCode"
import { City } from "../../../../../../country"
import { finistere } from "../Finistere"

export const concarneau = new City(FinistereCityCode.Concarneau, finistere, [Place.fromDMS("47°52′34″N,3°55′04″W")])
