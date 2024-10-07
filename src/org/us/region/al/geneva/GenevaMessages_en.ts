import { slocombMessages } from "./slocomb/SlocombMessages.js"
import { GenevaCityCode } from "./GenevaCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const genevaMessages_en = DepartmentMessages.create("Geneva County", {
  [GenevaCityCode.Slocomb]: slocombMessages
})
