import { RioDeJaneiroCityCode } from "./RioDeJaneiroCityCode.js"
import { rioDeJaneiroMessages } from "./20000-000/RioDeJaneiroMessages.js"
import { DepartmentMessages } from "../../../../country/index.js"

export let rioDeJaneiroMessages_en = DepartmentMessages.create("State of Rio de Janeiro", {
  [RioDeJaneiroCityCode.RioDeJaneiro]: rioDeJaneiroMessages
})
