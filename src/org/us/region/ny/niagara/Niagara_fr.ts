import { DepartmentMessages } from "../../../../country/index.js"
import { NiagaraCityCode } from "./NiagaraCityCode.js"
import { niagaraFallsMessages } from "./niagarafalls/NiagaraFallsMessages.js"

export const niagara_fr = DepartmentMessages.create("Comté de Niagara", {
    [NiagaraCityCode.NiagaraFalls]: niagaraFallsMessages
  }
)
