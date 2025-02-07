import { HebeiCityCode } from "./HebeiCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"
import { tianjinMessages_cn } from "./Tianjin/TianjinMessages_cn"

export const hebeiMessages_cn = new DepartmentMessages(["河北", "Héběi"], {
    [HebeiCityCode.Tianjin]: tianjinMessages_cn
  }
)
