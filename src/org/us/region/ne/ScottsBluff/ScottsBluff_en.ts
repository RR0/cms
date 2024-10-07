import { DepartmentMessages } from "../../../../country"
import { ScottsBluffCityCode } from "./ScottsBluffCityCode"
import { scottsbluffMessages } from "./Scottsbluff/ScottsbluffMessages"

export const scottsBluff_en = DepartmentMessages.create("Scotts Bluff County", {
    [ScottsBluffCityCode.Scottsbluff]: scottsbluffMessages
  }
)
