import { DepartmentMessages } from "../../../../country/index.js"
import { ScottsBluffCityCode } from "./ScottsBluffCityCode.js"
import { scottsbluffMessages } from "./Scottsbluff/ScottsbluffMessages.js"

export const scottsBluff_fr = DepartmentMessages.create("Comté de Scotts Bluff", {
    [ScottsBluffCityCode.Scottsbluff]: scottsbluffMessages
  }
)
