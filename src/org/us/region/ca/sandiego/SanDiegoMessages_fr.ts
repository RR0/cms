import { oceansideMessages } from "./oceanside/OceansideMessages.js"
import { campPendletonMessages } from "./camppendleton/CampPendletonMessages.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const sanDiegoMessages_fr = DepartmentMessages.create(
  "Comté de San Diego",
  {
    92058: oceansideMessages,
    "92058_base": campPendletonMessages
  }
)
