import { DaneCityCode } from "./DaneCityCode"
import { DepartmentMessages } from "../../../../country"
import { madison_en } from "./Madison/Madison_en"

export const dane_en = DepartmentMessages.create("Dane County", {
  [DaneCityCode.madison]: madison_en
})