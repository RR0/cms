import { CountryMessages } from "../country/index.js"
import { ChinaMessagesList } from "./ChinaMessages.js"
import { northChinaMessages_fr } from "./region/n/NorthChinaMessages_fr.js"

export const china_fr = new CountryMessages<ChinaMessagesList>(
  ["Chine", "République Populaire de Chine", "RPC", "Chine populaire", "Chine communiste"], {
    n: northChinaMessages_fr
  })
