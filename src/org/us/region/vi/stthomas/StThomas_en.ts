import { StThomasCityCode } from "./StThomasCityCode"
import { DepartmentMessages } from "../../../../country"
import { charlotteAmalie_en } from "./CharlotteAmalie/CharlotteAmalie_en"

export const stThomas_en = DepartmentMessages.create("Saint Thomas", {
  [StThomasCityCode.CharlotteAmalie]: charlotteAmalie_en
})
