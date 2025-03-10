import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { collectiviteOutreMer } from "../CollectiviteOutreMer.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const nouvelleCaledonie = Department.create(FranceDepartementCode.NouvelleCaledonie, collectiviteOutreMer,
  Place.fromDMS(`21°15′S,165°18′E`))
