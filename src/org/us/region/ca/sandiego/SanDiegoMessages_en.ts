import { oceansideMessages } from "./oceanside/OceansideMessages.js"
import { campPendletonMessages } from "./camppendleton/CampPendletonMessages.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const sanDiegoMessages_en = DepartmentMessages.create(
  "San Diego County",
  {
    92058: oceansideMessages,
    "92058_base": campPendletonMessages
  }
)
