import { DepartmentMessages, RegionMessages } from "../../../../country"
import { calvadosMessages } from "./14/CalvadosMessages"
import { NormandieDepartmentCode } from "./NormandieDepartmentCode"
import { seineMaritimeMessages } from "./76/SeineMaritimeMessages"

const normandyMessageList: { [key in NormandieDepartmentCode]: DepartmentMessages<any> } = {
  [NormandieDepartmentCode.Calvados]: calvadosMessages,
  [NormandieDepartmentCode.SeineMaritime]: seineMaritimeMessages
}
/**
 * French translations of messages about the Normandy French region.
 */
export const normandieMessages_fr = RegionMessages.create("Normandie", normandyMessageList)