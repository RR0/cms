import { DepartmentMessages } from "../../../country/index.js"
import { beiraCityCode } from "./beira/Beira.js"
import { beiraMessages } from "./beira/BeiraMessages.js"

export const sofalaMessages_fr = DepartmentMessages.create("Sofala", {
  [beiraCityCode]: beiraMessages
})
