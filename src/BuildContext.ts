import { CityService, DepartmentService } from "./org"
import { CountryService } from "./org/country/CountryService"

export interface BuildContext {

  cityService: CityService
  departmentService: DepartmentService
  countryService: CountryService
}
