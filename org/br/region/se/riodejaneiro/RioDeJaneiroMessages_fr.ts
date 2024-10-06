import { RioDeJaneiroCityCode } from "./RioDeJaneiroCityCode"
import { rioDeJaneiroMessages } from "./20000-000/RioDeJaneiroMessages"
import { DepartmentMessages } from "../../../../country"

export let rioDeJaneiroMessages_fr = DepartmentMessages.create("État de Rio de Janeiro", {
  [RioDeJaneiroCityCode.RioDeJaneiro]: rioDeJaneiroMessages
})
