import { northKareliaMessages_fr } from "./region/nk/NorthKareliaMessages_fr"
import { FinlandMessages } from "./FinlandMessages"
import { pirkanmaaMessages_fr } from "./region/p/PirkanmaaMessages_fr"
import { southSavo_fr } from "./region/ss/SouthSavo_fr"

export const finland_fr = new FinlandMessages(["Finlande"], {
    nk: northKareliaMessages_fr,
    p: pirkanmaaMessages_fr,
    ss: southSavo_fr
  }
)