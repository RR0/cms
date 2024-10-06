import { lyon69Messages } from "./Lyon/Lyon69Messages"
import { RhoneCityCode } from "./RhoneCityCode"
import { belleville69Messages } from "./Belleville/BellevilleMessages"
import { DepartmentMessages } from "../../../../../country"

export const rhoneMessages = DepartmentMessages.create("Rhône", {
  [RhoneCityCode.Lyon]: lyon69Messages,
  [RhoneCityCode.Belleville]: belleville69Messages
})
