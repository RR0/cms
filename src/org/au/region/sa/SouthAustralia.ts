import { australiaRegion } from "../AustraliaRegion.js"
import { AustraliaRegionCode } from "../AustraliaRegionCode.js"
import { Place } from "@rr0/place"

export let southAustralia = australiaRegion(AustraliaRegionCode.sa, Place.fromDMS("30°0'S 135°0'E"))
