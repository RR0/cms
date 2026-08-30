import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { LaReunionDepartementCode } from "./LaReunionDepartementCode.js"
import { laReunion974Messages_en } from "./974/LaReunion_en.js"

export const laReunionDepartmentsMessages_en: { [key in LaReunionDepartementCode]: DepartmentMessages<any> } = {
  [LaReunionDepartementCode.LaReunion]: laReunion974Messages_en
}
export const laReunionRegion_en = RegionMessages.create<{ [key in LaReunionDepartementCode]: DepartmentMessages<any> }>(
  "Réunion", laReunionDepartmentsMessages_en
)
