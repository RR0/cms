import { CityService, DepartmentService } from "./org"
import { CountryService } from "./org/country/CountryService"

export interface CMSContext {

  cityService: CityService
  departmentService: DepartmentService
  countryService: CountryService
}
