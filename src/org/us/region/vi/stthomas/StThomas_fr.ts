import { StThomasCityCode } from "./StThomasCityCode"
import { DepartmentMessages } from "../../../../country"
import { charlotteAmalie_fr } from "./CharlotteAmalie/CharlotteAmalie_fr"

export const stThomas_fr = DepartmentMessages.create("Saint-Thomas", {
  [StThomasCityCode.CharlotteAmalie]: charlotteAmalie_fr
})