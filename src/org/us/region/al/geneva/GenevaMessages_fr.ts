import { slocombMessages } from "./slocomb/SlocombMessages.js"
import { GenevaCityCode } from "./GenevaCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const genevaMessages_fr = DepartmentMessages.create("Comté de Geneva", {
  [GenevaCityCode.Slocomb]: slocombMessages
})
