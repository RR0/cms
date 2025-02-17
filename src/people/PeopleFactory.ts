import { People } from "./People.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { PeopleJson } from "./PeopleJson"
import { StringUtil } from "../util"
import path from "path"

export class PeopleFactory extends TypedDataFactory<People, PeopleJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "people")
  }

  parse(peopleJson: PeopleJson): People {
    peopleJson = this.completeFromDirName(peopleJson)
    const peopleData = super.parse(peopleJson)
    const people = new People(peopleData.firstNames, peopleData.lastName, peopleData.occupations,
      peopleData.occupations,
      peopleData.countries, peopleData.discredited, peopleData.birthTime, peopleData.deathTime, peopleData.gender,
      peopleData.id, peopleData.dirName, peopleData.image, peopleData.url, peopleData.events)
    peopleJson.name = people.name
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
    return people
  }

  /**
   * Determine people name from directory name.
   *
   * @param peopleJson
   */
  protected completeFromDirName(peopleJson: PeopleJson): PeopleJson {
    const result = {...peopleJson}
    const dirName = peopleJson.dirName
    if (dirName) {
      const lastSlash = dirName.lastIndexOf("/")
      const lastDir = dirName.substring(lastSlash + 1)
      const title = StringUtil.camelToText(lastDir)
      const firstSpace = title.indexOf(" ")
      const lastName = title.substring(0, firstSpace)
      result.lastName = peopleJson.lastName || lastName
      const firstNameStr = title.substring(firstSpace + 1)
      const firstNames = firstNameStr.split(" ")
      result.firstNames = peopleJson.firstNames || firstNames
      const id = path.basename(dirName)
      result.id = peopleJson.id || id
      result.title = `${firstNames.join(" ")} ${lastName}`
    } else {
      result.dirName = ""
    }
    return result
  }
}
