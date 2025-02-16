import { API } from "./API.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { APIJson } from "./APIJson"

export class APIFactory extends TypedDataFactory<API, APIJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "api", ["index"])
  }

  parse(apiJson: APIJson): API {
    const events = apiJson.events.map(this.eventFactory.parse)
    return {type: "api", id: apiJson.id, dirName: apiJson.dirName, url: apiJson.url, events}
  }
}
