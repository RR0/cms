import { Place } from "@rr0/place"
import { NewYorkCountyCode } from "../NewYorkCountyCode.js"
import { Department } from "../../../../country/region/department/Department.js"
import { newYork } from "../NewYork.js"

export const niagara = Department.create(NewYorkCountyCode.Niagara, newYork, Place.fromDMS("43°19′N,78°47′W"))
