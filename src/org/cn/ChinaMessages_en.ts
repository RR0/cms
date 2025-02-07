import { CountryMessages } from "../country/index.js"
import { ChinaMessagesList } from "./ChinaMessages.js"
import { northChinaMessages_en } from "./region/n/NorthChinaMessages_en"

export const china_en = new CountryMessages<ChinaMessagesList>(["China", "People's Republic of China", "PRC"], {
  n: northChinaMessages_en
})
