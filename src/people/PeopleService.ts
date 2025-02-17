import { People } from "./People.js"
import { PeopleFactory } from "./PeopleFactory.js"
import { AbstractDataService, AllDataService } from "@rr0/data"
import { TimeService } from "../time"
import { PeopleJson } from "./PeopleJson"

export class PeopleService extends AbstractDataService<People, PeopleJson> {

  readonly cache = new Map<string, People>()

  constructor(dataService: AllDataService, protected peopleFactory: PeopleFactory, files: string[],
              protected timeService: TimeService) {
    super(dataService, peopleFactory, files)
  }

  createFromFullName(fullName: string): People {
    let lastName: string
    let firstNames: string[]
    let commaPos = fullName.indexOf(",")
    if (commaPos > 0) {
      lastName = fullName.substring(0, commaPos).trim()
      firstNames = fullName.substring(commaPos + 1).trim().replace("  ", " ").split(" ")
    } else {
      let spaceParts = fullName.split(" ")
      if (spaceParts.length > 1) {
        const lastPos = spaceParts.length - 1
        lastName = spaceParts[lastPos]
        firstNames = spaceParts.slice(0, lastPos)
      } else {
        lastName = fullName
        firstNames = []
      }
    }
    let dirName: string | undefined = this.cache.get(lastName.toLowerCase())?.dirName || People.getUrl(lastName,
      firstNames)
    if (this.files.indexOf(dirName) < 0) {
      dirName = undefined
    }
    const created = this.peopleFactory.parse({firstNames, lastName, dirName})
    this.cache.set(lastName, created)
    return created
  }

  async getAll(): Promise<People[]> {
    return this.getFromDirs(this.files)
  }

  async getFromDirs(dirNames: string[]): Promise<People[]> {
    let peopleList: People[] = []
    for (const dirName of dirNames) {
      const list = await this.getFromDir(dirName)
      peopleList.push(...list)
    }
    return peopleList
  }

  async getFromDir(dirName: string): Promise<People[]> {
    const fileSpec = ["people*.json"]
    return this.dataService.getFromDir<People>(dirName, ["people", undefined], fileSpec)
  }
}
