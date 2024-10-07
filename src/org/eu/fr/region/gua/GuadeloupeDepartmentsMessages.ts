import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export type GuadeloupeDepartmentsMessages = { [key in GuadeloupeDepartementCode]: DepartmentMessages<any> };
