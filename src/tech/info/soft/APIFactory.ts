import { API } from "./API.js"
import { RR0Data, RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { APIJson } from "./APIJson"

export class APIFactory extends TypedDataFactory<API, APIJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "api", ["index"])
  }

  createFromData(data: RR0Data): API {
    const api: API = {type: "api", id: data.id, dirName: data.dirName, url: data.url, events: data.events || []}
    Object.assign(api, data)
    return api
  }
}
