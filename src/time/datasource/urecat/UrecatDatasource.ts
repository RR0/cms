import { UrecatCase } from "./UrecatCase.js"
import { AbstractDatasource } from "../AbstractDatasource.js"

export abstract class UrecatDatasource extends AbstractDatasource<UrecatCase> {
  readonly authors = ["Gross, Patrick"]
  readonly copyright = "URECAT (Les ovnis vus de près)"
}
