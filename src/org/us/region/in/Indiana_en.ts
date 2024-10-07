import { monroe_en } from "./monroe/Monroe_en"
import { elkhart_en } from "./elkhart/Elkhart_en"
import { RegionMessages } from "../../../country"
import { IndianaMessages } from "./IndianaMessages"
import { whitley_en } from "./whitley/Whitley_en"

export const indiana_en = RegionMessages.create<IndianaMessages>("Indiana", {
  elkhart: elkhart_en,
  monroe: monroe_en,
  whitley: whitley_en
})
