import { RelativeTimeTextBuilder } from "./RelativeTimeTextBuilder.js"
import { cmsTestUtil } from "../../test/CMSTestUtil.js"
import { test } from "vitest"
import { TimeTextBuilder } from "./TimeTextBuilder.js"
import { Level0Duration } from "@rr0/time"
test("x", () => {
  const b = new RelativeTimeTextBuilder(new TimeTextBuilder(cmsTestUtil.intlOptions))
  const prev = cmsTestUtil.time.newHtmlContext("1/9/4/7/07", "")
  console.log("prev", prev.time.toString(), prev.time.getDayOfMonth())
  const ctx = prev.clone()
  ctx.time.updateFromStr("1947-07-01")
  const ms = ctx.time.date.compare(prev.time.date as any)
  console.log("ctx", ctx.time.toString(), ms, JSON.stringify(Level0Duration.toSpec(ms)))
  console.log(b.build(prev, ctx))
  const c2 = ctx.clone(); c2.time.updateFromStr("1947-07-02")
  const ms2 = c2.time.date.compare(prev.time.date as any)
  console.log(ms2, JSON.stringify(Level0Duration.toSpec(ms2)), b.build(prev, c2))
})
test("y", () => {
  const b = new RelativeTimeTextBuilder(new TimeTextBuilder(cmsTestUtil.intlOptions))
  const prev = cmsTestUtil.time.newHtmlContext("1/9/4/7", "")
  const ctx = prev.clone()
  ctx.time.updateFromStr("1947-01")
  const ms = ctx.time.date.compare(prev.time.date as any)
  console.log("Y", prev.time.toString(), ctx.time.toString(), ms, JSON.stringify(Level0Duration.toSpec(ms)), b.build(prev, ctx))
})
