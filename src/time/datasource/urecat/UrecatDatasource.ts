import { UrecatCase } from "./UrecatCase"
import { AbstractDatasource } from "../AbstractDatasource"

export abstract class UrecatDatasource extends AbstractDatasource<UrecatCase> {
  readonly authors = ["Gross, Patrick"]
  readonly copyright = "URECAT (Les ovnis vus de près)"
}
