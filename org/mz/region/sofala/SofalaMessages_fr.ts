import { DepartmentMessages } from "../../../country"
import { beiraCityCode } from "./beira/Beira"
import { beiraMessages } from "./beira/BeiraMessages"

export const sofalaMessages_fr = DepartmentMessages.create("Sofala", {
  [beiraCityCode]: beiraMessages
})
