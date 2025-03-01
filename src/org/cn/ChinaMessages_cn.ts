import { CountryMessages } from "../country/index.js"
import { ChinaMessagesList } from "./ChinaMessages.js"
import { northChinaMessages_cn } from "./region/n/NorthChinaMessages_cn.js"

export const china_cn = new CountryMessages<ChinaMessagesList>(["中国", "中华人民共和国", "zhōngguó"], {
  n: northChinaMessages_cn
})
