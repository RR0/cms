import { lyon69Messages } from "./Lyon/Lyon69Messages.js"
import { RhoneCityCode } from "./RhoneCityCode.js"
import { belleville69Messages } from "./Belleville/BellevilleMessages.js"
import { DepartmentMessages } from "../../../../../country/index.js"

export const rhoneMessages = DepartmentMessages.create("Rhône", {
  [RhoneCityCode.Lyon]: lyon69Messages,
  [RhoneCityCode.Belleville]: belleville69Messages
})
