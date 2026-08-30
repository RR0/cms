import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"
import { beiraCityCode } from "./beira/Beira.js"
import { beiraMessages } from "./beira/BeiraMessages.js"

export const sofalaMessages_en = DepartmentMessages.create("Sofala", {
  [beiraCityCode]: beiraMessages
})
