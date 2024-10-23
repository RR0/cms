import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { Datasource } from "../Datasource.js"
import { RR0Context } from "../../../RR0Context.js"

export abstract class FuforaDatasource implements Datasource<FuforaCaseSummary> {
  readonly authors = ["FUFORA"]
  readonly copyright = "Base de données observationnelle"

  abstract fetch(context: RR0Context): Promise<FuforaCaseSummary[]>
}
