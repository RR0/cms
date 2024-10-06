import { MeurtheEtMoselleCityCode } from "./MeurtheEtMoselleCityCode"
import { cosnesEtRomainMessages } from "./CosnesEtRomain/CosnesEtRomainMessages"
import { nancyMessages } from "./Nancy/NancyMessages"
import { neuvesMaisonsMessages } from "./NeuvesMaisons/NeuvesMaisonsMessages"
import { DepartmentMessages } from "../../../../../country"

export const meurtheEtMoselleMessages = DepartmentMessages.create("Meurthe-et-Moselle", {
  [MeurtheEtMoselleCityCode.CosnesEtRomain]: cosnesEtRomainMessages,
  [MeurtheEtMoselleCityCode.Nancy]: nancyMessages,
  [MeurtheEtMoselleCityCode.NeuvesMaisons]: neuvesMaisonsMessages
})
