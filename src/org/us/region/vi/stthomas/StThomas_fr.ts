import { StThomasCityCode } from "./StThomasCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"
import { charlotteAmalie_fr } from "./CharlotteAmalie/CharlotteAmalie_fr.js"

export const stThomas_fr = DepartmentMessages.create("Saint-Thomas", {
  [StThomasCityCode.CharlotteAmalie]: charlotteAmalie_fr
})
