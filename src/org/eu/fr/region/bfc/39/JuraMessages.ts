import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { JuraCityCode } from "./JuraCityCode"
import { saintClaudeMessages } from "./SaintClaude/SaintClaudeMessages"
import { CityMessages } from "../../../../../country"

type DepMessages = { [key in JuraCityCode]: CityMessages }
export const juraMessages = DepartmentMessages.create<DepMessages>("Jura", {
  [JuraCityCode.SaintClaude]: saintClaudeMessages
})
