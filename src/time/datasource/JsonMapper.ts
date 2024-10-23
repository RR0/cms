import { CaseMapper } from "./CaseMapper.js"
import { RR0Context } from "../../RR0Context.js"

export class JsonMapper<S> implements CaseMapper<RR0Context, S, Object> {

  map(context: RR0Context, sourceCase: S, sourceTime: Date): Object {
    return undefined
  }

  /**
   * Converts CSV contents to a list of cases.
   *
   * @param context
   * @param data
   */
  parse(context: RR0Context, data: string): S[] {
    const parsed = JSON.parse(data)
    return parsed as S[]
  }
}
