import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode"
import { DepartmentMessages } from "../../../../country"

export type GuadeloupeDepartmentsMessages = { [key in GuadeloupeDepartementCode]: DepartmentMessages<any> };
