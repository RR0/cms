import { People } from "./People.js"
import path from "path"
import { StringUtil } from "../util/index.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { PeopleJson } from "./PeopleJson"
import { RR0EventJson } from "@rr0/data/dist/event/RR0EventJson"

export class PeopleFactory extends TypedDataFactory<People, PeopleJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "people")
  }

  /**
   * Determine people name from directory name.
   *
   * @param dirName
   */
  createFromDirName(dirName: string): People {
    const lastSlash = dirName.lastIndexOf("/")
    const lastDir = dirName.substring(lastSlash + 1)
    const title = StringUtil.camelToText(lastDir)
    const firstSpace = title.indexOf(" ")
    const lastName = title.substring(0, firstSpace)
    const firstNameStr = title.substring(firstSpace + 1)
    const firstNames = firstNameStr.split(" ")
    const id = path.basename(dirName)
    return new People(firstNames, lastName, undefined, undefined, undefined, false, undefined, undefined,
      undefined, id, dirName)
  }

  createFromData(peopleJson: PeopleJson): People {
    const people = this.createFromDirName(peopleJson.dirName)
    peopleJson.name = people.name
    Object.assign(people, super.parse(peopleJson))
    let title = peopleJson.title
    let qualifier: string | undefined
    if (title) {
      const qualifStart = title.indexOf("(")
      if (qualifStart > 0) {
        qualifier = title.substring(qualifStart + 1, title.indexOf(")"))
        title = title.substring(0, qualifStart).trim()
      }
      const names = title.split(",")
      if (names.length > 1) {
        people.lastName = names.splice(0, 1)[0].trim()
        people.firstNames.length = 0
        people.firstNames.push(...names[0].trim().split(" "))
        people.lastAndFirstName = people.getLastAndFirstName()
      } else {
        const names = title.split(" ")
        people.firstNames = names.slice(0, names.length - 1)
        people.name = people.lastName = names[names.length - 1]
        people.lastAndFirstName = title
      }
    }
    people.title = people.firstAndLastName + (qualifier ? ` (${qualifier})` : "")
    const birthTime = peopleJson.birthTime as unknown as string
    const events: RR0EventJson[] = peopleJson.events || []
    if (birthTime) {
      delete (peopleJson as any).birthTime
      events.push({type: "event", eventType: "birth", time: birthTime, events: []})
    }
    const deathTime = (peopleJson as any).deathTime as unknown as string
    if (deathTime) {
      delete (peopleJson as any).deathTime
      events.push({type: "event", eventType: "death", time: deathTime as any, events: []})
    }
    return people
  }
}
