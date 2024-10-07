import { RegionMessages } from "../../../country/index.js"
import { ManitobaDepartmentCode } from "./ManitobaDepartmentCode.js"
import { eastmanMessages } from "./eastman/EastmanMessages.js"

export const manitobaMessages_en = RegionMessages.create("Manitoba", {
    [ManitobaDepartmentCode.eastman]: eastmanMessages
  }
)
