import { RegionMessages } from "../../../country"
import { ManitobaDepartmentCode } from "./ManitobaDepartmentCode"
import { eastmanMessages } from "./eastman/EastmanMessages"

export const manitobaMessages_fr = RegionMessages.create("Manitoba", {
    [ManitobaDepartmentCode.eastman]: eastmanMessages
  }
)
