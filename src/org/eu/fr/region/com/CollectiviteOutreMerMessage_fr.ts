import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { CollectiviteOutreMerDepartementCode } from "./CollectiviteOutreMerDepartementCode.js"
import { nouvelleCaledonie_fr } from "./988/NouvelleCaledonie_fr.js"

const collectiviteOutreMerCityMessages: { [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> } = {
  [CollectiviteOutreMerDepartementCode.NouvelleCaledonie]: nouvelleCaledonie_fr
}
export const collectiviteOutreMerMessage_fr = RegionMessages.create<{ [key in CollectiviteOutreMerDepartementCode]: DepartmentMessages<any> }>(
  "Collectivité d'outre-mer", collectiviteOutreMerCityMessages
)
