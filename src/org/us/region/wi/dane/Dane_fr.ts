import { DaneCityCode } from "./DaneCityCode"
import { DepartmentMessages } from "../../../../country"
import { madison_fr } from "./Madison/Madison_fr"

export const dane_fr = DepartmentMessages.create("Comté de Dane", {
  [DaneCityCode.madison]: madison_fr
})
