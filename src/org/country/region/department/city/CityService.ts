import { RR0Context } from "../../../../../RR0Context.js"
import { OrganizationService } from "../../../../OrganizationService.js"
import { Department } from "../Department.js"
import { City } from "./City.js"

export class CityService extends OrganizationService<City, Department> {

  protected nameToFind(context: RR0Context, city: City, nameToFind: string): string {
    const cityMessages = city.getMessages(context)
    const normalizedName = OrganizationService.normalizeName(nameToFind)
    return cityMessages.cityName(normalizedName)
  }
}
