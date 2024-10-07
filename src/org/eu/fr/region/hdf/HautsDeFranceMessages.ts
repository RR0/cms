import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { nordMessages } from "./59/NordMessages.js"
import { HautsDeFranceDepartmentCode } from "./HautsDeFranceDepartmentCode.js"
import { pasDeCalaisMessages } from "./62/PasDeCalaisMessages.js"
import { sommeMessages } from "./80/SommeMessages.js"
import { aisneMessages } from "./02/AisneMessages.js"

export type NouvelleAquitaineDepartmentMessagesList = { [key in HautsDeFranceDepartmentCode]: DepartmentMessages<any> }
export const hautsDeFranceMessages = RegionMessages.create<NouvelleAquitaineDepartmentMessagesList>("Hauts-de-France", {
  [HautsDeFranceDepartmentCode.Aisne]: aisneMessages,
  [HautsDeFranceDepartmentCode.PasDeCalais]: pasDeCalaisMessages,
  [HautsDeFranceDepartmentCode.Nord]: nordMessages,
  [HautsDeFranceDepartmentCode.Somme]: sommeMessages
})
