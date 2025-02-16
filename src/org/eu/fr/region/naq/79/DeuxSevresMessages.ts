import { DeuxSevresCityCode } from "./DeuxSevresCityCode.js"
import { magneMessages } from "./Magne/MagneMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type DepMessages = { [key in DeuxSevresCityCode]: OrganizationMessages }
export const deuxSevresMessages = new DepartmentMessages<DepMessages>(
  ["Deux-Sèvres"], {
    [DeuxSevresCityCode.Magne]: magneMessages
  })
