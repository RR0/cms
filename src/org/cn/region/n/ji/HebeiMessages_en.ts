import { HebeiCityCode } from "./HebeiCityCode.js"
import { tianjinMessages_en } from "./Tianjin/TianjinMessages_en.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const hebeiMessages_en = new DepartmentMessages(["Hebei", "Hopeh"], {
    [HebeiCityCode.Tianjin]: tianjinMessages_en
  }
)
