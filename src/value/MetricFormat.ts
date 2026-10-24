/**
 * Formats a converted metric value for display.
 */
export class MetricFormat {

  /**
   * @param value The converted value.
   * @param locale The locale to format with (thousands separator, decimal mark).
   * @return The value rounded to the unit below 10, with one significant decimal under 10 (4 ft = 1.2 m, not 1 m),
   * or with a single significant digit when below 0.1 (so that it never shows as 0).
   */
  static format(value: number, locale: string): string {
    const abs = Math.abs(value)
    const options: Intl.NumberFormatOptions = abs >= 10 ? {maximumFractionDigits: 0}
      : abs >= 0.1 || abs === 0 ? {maximumFractionDigits: 1} : {maximumSignificantDigits: 1}
    return new Intl.NumberFormat(locale, options).format(value)
  }
}
