import { OrganizationMessages } from "../../OrganizationMessages.js"
import { DepartmentMessagesList } from "./department/index.js"

/**
 *
 */
export class RegionMessages<D = DepartmentMessagesList> extends OrganizationMessages {
  /**
   *
   * @param titles
   * @param {object} department The object holding departments in its properties.
   */
  constructor(titles: string[], readonly department?: D) {
    super(titles)
  }

  /**
   *
   * @param title
   * @param {object} department The object holding departments in its properties.
   */
  static create<D>(title: string, department?: D): RegionMessages<D> {
    return new RegionMessages<D>([title], department)
  }
}
