import { RegionMessages } from "../../../country"
import { HawaiiMessages } from "./HawaiiMessages"
import { HawaiiCountyCode } from "./HawaiiCountyCode"
import { honolulu_fr } from "./honolulu/Honolulu_fr"

export const hawai_fr = RegionMessages.create<HawaiiMessages>("Hawaï", {
  [HawaiiCountyCode.Honolulu]: honolulu_fr
})
