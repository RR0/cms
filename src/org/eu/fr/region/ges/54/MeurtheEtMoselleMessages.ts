import { MeurtheEtMoselleCityCode } from "./MeurtheEtMoselleCityCode.js"
import { cosnesEtRomainMessages } from "./CosnesEtRomain/CosnesEtRomainMessages.js"
import { nancyMessages } from "./Nancy/NancyMessages.js"
import { neuvesMaisonsMessages } from "./NeuvesMaisons/NeuvesMaisonsMessages.js"
import { DepartmentMessages } from "../../../../../country/index.js"

export const meurtheEtMoselleMessages = DepartmentMessages.create("Meurthe-et-Moselle", {
  [MeurtheEtMoselleCityCode.CosnesEtRomain]: cosnesEtRomainMessages,
  [MeurtheEtMoselleCityCode.Nancy]: nancyMessages,
  [MeurtheEtMoselleCityCode.NeuvesMaisons]: neuvesMaisonsMessages
})
