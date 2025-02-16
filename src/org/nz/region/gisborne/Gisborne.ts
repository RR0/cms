import { Place } from "@rr0/place"
import { NewZealandRegionCode } from "../NewZealandRegionCode.js"
import { newZealandRegion } from "../../NewZealand.js"

export const gisborneRegion = newZealandRegion(NewZealandRegionCode.gis, Place.fromDMS("38°40′00″S,178°01′00″E"))
