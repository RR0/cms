import { DepartmentMessages, RegionMessages } from "../../../../country"
import { PacaDepartementCode } from "./PacaDepartementCode"
import { hautesAlpesMessages } from "./05/HautesAlpesMessages"
import { vaucluseMessages } from "./84/VaucluseMessages"
import { alpesMaritimesMessages } from "./06/AlpesMaritimesMessages"
import { varMessages } from "./83/VarMessages"
import { bouchesDuRhoneMessages } from "./13/BouchesDuRhoneMessages"
import { alpesDeHauteProvenceMessages } from "./04/AlpesDeHauteProvenceMessages"
import { vendeeMessages } from "./85/VendeeMessages"

type PacaDepartmentMessagesList = { [key in PacaDepartementCode]: DepartmentMessages<any> }
export const pacaMessages = RegionMessages.create<PacaDepartmentMessagesList>(
  "Provence-Alpes-Côte d'Azur", {
    [PacaDepartementCode.AlpesDeHauteProvence]: alpesDeHauteProvenceMessages,
    [PacaDepartementCode.AlpesMaritimes]: alpesMaritimesMessages,
    [PacaDepartementCode.BouchesDuRhone]: bouchesDuRhoneMessages,
    [PacaDepartementCode.HautesAlpes]: hautesAlpesMessages,
    [PacaDepartementCode.Vaucluse]: vaucluseMessages,
    [PacaDepartementCode.Var]: varMessages,
    [PacaDepartementCode.Vendee]: vendeeMessages
  }
)
