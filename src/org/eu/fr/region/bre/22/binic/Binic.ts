import { Place } from "../../../../../../../place"
import { CotesDArmorCityCode } from "../CotesDArmorCityCode"
import { City } from "../../../../../../country"
import { cotesDArmor } from "../CotesDArmor"

export const binic = new City(CotesDArmorCityCode.Binic, cotesDArmor,
  [Place.fromDMS("48°36′09″N,2°49′27″W"), Place.fromDMS("48°37′38″N,2°50′02″W")])