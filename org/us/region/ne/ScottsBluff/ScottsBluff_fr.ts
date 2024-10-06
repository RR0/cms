import { DepartmentMessages } from "../../../../country"
import { ScottsBluffCityCode } from "./ScottsBluffCityCode"
import { scottsbluffMessages } from "./Scottsbluff/ScottsbluffMessages"

export const scottsBluff_fr = DepartmentMessages.create("Comté de Scotts Bluff", {
    [ScottsBluffCityCode.Scottsbluff]: scottsbluffMessages
  }
)
