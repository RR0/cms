import { DepartmentMessages } from "../../../../country/index.js"
import { NiagaraCityCode } from "./NiagaraCityCode.js"
import { niagaraFallsMessages } from "./niagarafalls/NiagaraFallsMessages.js"

export const niagara_en = DepartmentMessages.create("Niagara County", {
    [NiagaraCityCode.NiagaraFalls]: niagaraFallsMessages
  }
)
