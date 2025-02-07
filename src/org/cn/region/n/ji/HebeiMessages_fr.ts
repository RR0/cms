import { HebeiCityCode } from "./HebeiCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"
import { tianjinMessages_fr } from "./Tianjin/TianjinMessages_fr"

export const hebeiMessages_fr = new DepartmentMessages(["Hebei", "Hopeh"], {
    [HebeiCityCode.Tianjin]: tianjinMessages_fr
  }
)
