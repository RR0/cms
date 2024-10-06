import { slocombMessages } from "./slocomb/SlocombMessages"
import { GenevaCityCode } from "./GenevaCityCode"
import { DepartmentMessages } from "../../../../country"

export const genevaMessages_fr = DepartmentMessages.create("Comté de Geneva", {
  [GenevaCityCode.Slocomb]: slocombMessages
})
