import { Gender } from "@rr0/common"
import { Occupation } from "@rr0/data"

export type OccupationMessages = { [key in Occupation]: (gender: Gender) => string }
