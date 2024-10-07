import { GuadeloupeCityCode } from "./GuadeloupeCityCode"
import { DepartmentMessages } from "../../../../../country"
import { capesterreDeMarieGalanteMessages } from "./CapesterreMarieGalante/CapesterreMarieGalanteMessages"
import { GuadeloupeCityMessage } from "./GuadeloupeCityMessage"
import { leMouleMessages } from "./LeMoule/LeMouleMessages"

export const guadeloupe971Messages_en = DepartmentMessages.create<GuadeloupeCityMessage>("Guadeloupe", {
  [GuadeloupeCityCode.LeMoule]: leMouleMessages,
  [GuadeloupeCityCode.CapesterreMarieGalante]: capesterreDeMarieGalanteMessages
})
