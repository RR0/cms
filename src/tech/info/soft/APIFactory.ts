import { API } from "./API"
import { RR0Data, TypedDataFactory } from "../../../data"
import { RR0EventFactory } from "../../../event"

export class APIFactory extends TypedDataFactory<API> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "api", ["index"])
  }

  createFromData(data: RR0Data): API {
    const api: API = {type: "api", id: data.id, dirName: data.dirName, url: data.url, events: data.events || []}
    Object.assign(api, data)
    return api
  }
}
