import { DepartmentMessages, RegionMessages } from "../../../../country"
import { CollectiviteOutreMerDepartementCode } from "./CollectiviteOutreMerDepartementCode"
import { nouvelleCaledonie_en } from "./988/NouvelleCaledonie_en"

const collectiviteOutreMerCityMessages: { [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> } = {
  [CollectiviteOutreMerDepartementCode.NouvelleCaledonie]: nouvelleCaledonie_en
}
export const collectiviteOutreMerMessage_en = RegionMessages.create<{ [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> }>(
  "Overseas collectivity", collectiviteOutreMerCityMessages
)
