import { RioDeJaneiroCityCode } from "./RioDeJaneiroCityCode"
import { rioDeJaneiroMessages } from "./20000-000/RioDeJaneiroMessages"
import { DepartmentMessages } from "../../../../country"

export let rioDeJaneiroMessages_en = DepartmentMessages.create("State of Rio de Janeiro", {
  [RioDeJaneiroCityCode.RioDeJaneiro]: rioDeJaneiroMessages
})
