import { SeineMaritimeCityCode } from "./SeineMaritimeCityCode.js"
import { londeMessages } from "./Londe/LondeMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { crielSurMerMessages } from "./CrielSurMer/CrielSurMerMessages.js"
import { CityMessages } from "../../../../../country/index.js"
import { dieppeMessages } from "./Dieppe/DieppeMessages.js"
import { saintAubinSurMer76Messages } from "./SaintAubinSurMer/SaintAubinSurMerMessages.js"

type SeineMaritimeCityMessagesList = { [key in SeineMaritimeCityCode]: CityMessages }
export const seineMaritimeMessages = new DepartmentMessages<SeineMaritimeCityMessagesList>(
  ["Seine-Maritime", "Seine-Inférieure"], {
    [SeineMaritimeCityCode.CrielSurMer]: crielSurMerMessages,
    [SeineMaritimeCityCode.Dieppe]: dieppeMessages,
    [SeineMaritimeCityCode.Londe]: londeMessages,
    [SeineMaritimeCityCode.SaintAubinSurMer]: saintAubinSurMer76Messages
  }
)
