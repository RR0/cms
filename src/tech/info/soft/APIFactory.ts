import { API } from "./API.js"
import { RR0EventFactory, SaidTexts, TypedDataFactory } from "@rr0/data"
import { APIJson } from "./APIJson.js"

export class APIFactory extends TypedDataFactory<API, APIJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "api", ["index"])
  }

  parse(apiJson: APIJson): API {
    const events = (apiJson.events || []).map(this.eventFactory.parse)
    return {type: "api", id: apiJson.id, dirName: apiJson.dirName, title: SaidTexts.any.read(apiJson.title), url: apiJson.url, events}
  }
}
