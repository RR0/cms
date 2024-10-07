import { GuadeloupeCityCode } from "./GuadeloupeCityCode.js"
import { DepartmentMessages } from "../../../../../country/index.js"
import { capesterreDeMarieGalanteMessages } from "./CapesterreMarieGalante/CapesterreMarieGalanteMessages.js"
import { GuadeloupeCityMessage } from "./GuadeloupeCityMessage.js"
import { leMouleMessages } from "./LeMoule/LeMouleMessages.js"

export const guadeloupe971Messages_en = DepartmentMessages.create<GuadeloupeCityMessage>("Guadeloupe", {
  [GuadeloupeCityCode.LeMoule]: leMouleMessages,
  [GuadeloupeCityCode.CapesterreMarieGalante]: capesterreDeMarieGalanteMessages
})
