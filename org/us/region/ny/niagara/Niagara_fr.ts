import { DepartmentMessages } from "../../../../country"
import { NiagaraCityCode } from "./NiagaraCityCode"
import { niagaraFallsMessages } from "./niagarafalls/NiagaraFallsMessages"

export const niagara_fr = DepartmentMessages.create("Comté de Niagara", {
    [NiagaraCityCode.NiagaraFalls]: niagaraFallsMessages
  }
)
