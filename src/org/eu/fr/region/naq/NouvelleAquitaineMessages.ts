import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { NouvelleAquitaineDepartmentCode } from "./NouvelleAquitaineDepartmentCode.js"
import { creuseMessages } from "./23/CreuseMessages.js"
import { charenteMessages } from "./16/CharenteMessages.js"
import { landesMessages } from "./40/LandesMessages.js"
import { charenteMaritimeMessages } from "./17/CharenteMaritimeMessages.js"
import { vienneMessages } from "./86/VienneMessages.js"
import { correzeMessages } from "./19/CorrezeMessages.js"
import { girondeMessages } from "./33/GirondeMessages.js"
import { lotEtGaronneMessages } from "./47/LotEtGaronneMessages.js"
import { dordogneMessages } from "./24/DordogneMessages.js"
import { pyreneesOrientalesMessages } from "../occ/66/PyreneesOrientalesMessages.js"
import { pyreneesAtlantiquesMessages } from "./64/PyreneesAtlantiquesMessages.js"

const nouvelleAquitaineMessageList: { [key in NouvelleAquitaineDepartmentCode]: DepartmentMessages<any> } = {
  [NouvelleAquitaineDepartmentCode.Charente]: charenteMessages,
  [NouvelleAquitaineDepartmentCode.CharenteMaritime]: charenteMaritimeMessages,
  [NouvelleAquitaineDepartmentCode.Correze]: correzeMessages,
  [NouvelleAquitaineDepartmentCode.Creuse]: creuseMessages,
  [NouvelleAquitaineDepartmentCode.Dordogne]: dordogneMessages,
  [NouvelleAquitaineDepartmentCode.Gironde]: girondeMessages,
  [NouvelleAquitaineDepartmentCode.Landes]: landesMessages,
  [NouvelleAquitaineDepartmentCode.LotEtGaronne]: lotEtGaronneMessages,
  [NouvelleAquitaineDepartmentCode.PyreneesAtlantiques]: pyreneesAtlantiquesMessages,
  [NouvelleAquitaineDepartmentCode.PyreneesOrientales]: pyreneesOrientalesMessages,
  [NouvelleAquitaineDepartmentCode.Vienne]: vienneMessages
}
export const nouvelleAquitaineMessages = RegionMessages.create("Nouvelle Aquitaine", nouvelleAquitaineMessageList)
