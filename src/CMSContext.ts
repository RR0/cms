import { CityService, DepartmentService } from "./org/index.js"
import { CountryService } from "./org/country/CountryService.js"

export interface CMSContext {

  cityService: CityService
  departmentService: DepartmentService
  countryService: CountryService
}
