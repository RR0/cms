import { DepartmentMessages, RegionMessages } from "../../../../country"
import { PaysDeLoireDepartementCode } from "./PaysDeLoireDepartementCode"
import { sartheMessages } from "./72/SartheMessages"
import { maineEtLoireMessages } from "./49/MaineEtLoireMessages"
import { loireAtlantiqueMessages } from "./44/LoireAtlantiqueMessages"
import { mayenneMessages } from "./53/MayenneMessages"

type DepMessages = { [key in PaysDeLoireDepartementCode]: DepartmentMessages<any> }
export const paysDeLoireMessages = RegionMessages.create<DepMessages>("Pays-de-la-Loire", {
  [PaysDeLoireDepartementCode.LoireAtlantique]: loireAtlantiqueMessages,
  [PaysDeLoireDepartementCode.MaineEtLoire]: maineEtLoireMessages,
  [PaysDeLoireDepartementCode.Mayenne]: mayenneMessages,
  [PaysDeLoireDepartementCode.Sarthe]: sartheMessages
})
