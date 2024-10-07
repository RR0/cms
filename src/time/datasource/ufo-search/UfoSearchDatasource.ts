import { RR0SsgContext } from "../../../RR0SsgContext.js"
import { AbstractDatasource } from "../AbstractDatasource.js"
import { UfoSearchCase } from "./UfoSearchCase.js"

export abstract class UfoSearchDatasource extends AbstractDatasource<UfoSearchCase> {

  protected constructor() {
    super(["Geldreich, Rich"], "UFO Search")
  }

  protected abstract readCases(context: RR0SsgContext): Promise<UfoSearchCase[]>
}
