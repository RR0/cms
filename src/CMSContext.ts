import { DepartmentService } from "./org/country/region/department/DepartmentService.js"
import { CityService } from "./org/country/region/department/city/CityService.js"
import { CountryService } from "./org/country/CountryService.js"

export interface CMSContext {

  cityService: CityService
  departmentService: DepartmentService
  countryService: CountryService
}
