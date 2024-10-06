import { DepartmentMessages } from "../../../../country"
import { HonoluluCityCode } from "./HonoluluCityCode"
import { helemanoMessages } from "./Helemano/HelemanoMessages"

export const honolulu_en = DepartmentMessages.create("Honolulu County", {
  [HonoluluCityCode.Helemano]: helemanoMessages
})
