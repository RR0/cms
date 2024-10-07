import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { PaysDeLoireDepartementCode } from "./PaysDeLoireDepartementCode.js"
import { sartheMessages } from "./72/SartheMessages.js"
import { maineEtLoireMessages } from "./49/MaineEtLoireMessages.js"
import { loireAtlantiqueMessages } from "./44/LoireAtlantiqueMessages.js"
import { mayenneMessages } from "./53/MayenneMessages.js"

type DepMessages = { [key in PaysDeLoireDepartementCode]: DepartmentMessages<any> }
export const paysDeLoireMessages = RegionMessages.create<DepMessages>("Pays-de-la-Loire", {
  [PaysDeLoireDepartementCode.LoireAtlantique]: loireAtlantiqueMessages,
  [PaysDeLoireDepartementCode.MaineEtLoire]: maineEtLoireMessages,
  [PaysDeLoireDepartementCode.Mayenne]: mayenneMessages,
  [PaysDeLoireDepartementCode.Sarthe]: sartheMessages
})
