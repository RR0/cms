import { usaRegions } from "../../us/region/UsaRegions.js"
import { canadaRegions } from "../../ca/region/CanadaRegions.js"
import { australiaRegions } from "../../au/region/AustraliaRegions.js"
import { brazilRegions } from "../../br/region/BrazilRegions.js"
import { europeRegions } from "../../eu/EuropeRegions.js"
import { Region } from "./Region.js"
import { OrganizationService } from "../../OrganizationService.js"
import { indiaRegions } from "../../in/region/IndiaRegions.js"
import { CmsCountry } from "../CmsCountry.js"

export class RegionService extends OrganizationService<Region, CmsCountry> {
}

export const regions: Region[] = [
  ...australiaRegions,
  ...brazilRegions,
  ...canadaRegions,
  ...europeRegions,
  ...indiaRegions,
  ...usaRegions
]
