import { RR0Context } from "../../../RR0Context.js"
import { AbstractDatasource } from "../AbstractDatasource.js"
import { UfoSearchCase } from "./UfoSearchCase.js"

export abstract class UfoSearchDatasource extends AbstractDatasource<UfoSearchCase> {

  protected constructor() {
    super(["Geldreich, Rich"], "UFO Search")
  }

  protected abstract readCases(context: RR0Context): Promise<UfoSearchCase[]>
}
