import { UkRegionCode } from "../UkRegionCode.js"
import { Place } from "@rr0/place"
import { ukRegion } from "../../Uk.js"

export const england = ukRegion(UkRegionCode.eng, Place.fromDMS("53°0'N,1°0'W"))
