import { DepartmentMessages, RegionMessages } from "../../../../country"
import { CollectiviteOutreMerDepartementCode } from "./CollectiviteOutreMerDepartementCode"
import { nouvelleCaledonie_fr } from "./988/NouvelleCaledonie_fr"

const collectiviteOutreMerCityMessages: { [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> } = {
  [CollectiviteOutreMerDepartementCode.NouvelleCaledonie]: nouvelleCaledonie_fr
}
export const collectiviteOutreMerMessage_fr = RegionMessages.create<{ [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> }>(
  "Collectivité d'outre-mer", collectiviteOutreMerCityMessages
)
