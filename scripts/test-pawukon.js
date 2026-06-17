// Test script — verify Pawukon algorithm against known reference dates
import { getWukuByDate, validateAlgorithm } from '../src/data/wukuData.js'

console.log('=== Algorithm Validation ===')
const results = validateAlgorithm()
let allPass = true
for (const r of results) {
  console.log(`${r.pass ? '✓' : '✗'} ${r.date} expected ${r.expectedWuku} ${r.expectedSaptawara} ${r.expectedPancawara} day-${r.expectedDayInWuku} → got ${r.actual}`)
  if (!r.pass) allPass = false
}

console.log('')
if (allPass) {
  console.log('✓ ALL TESTS PASSED')
} else {
  console.log('✗ SOME TESTS FAILED')
}

console.log('')
console.log('=== Today ===')
const today = new Date().toISOString().slice(0, 10)
const todayResult = getWukuByDate(today)
console.log(`${today}:`)
console.log(`  Wuku: ${todayResult.wuku.name} (order ${todayResult.wuku.order}/30)`)
console.log(`  Day in Wuku: ${todayResult.dayInWuku + 1}/7`)
console.log(`  Saptawara: ${todayResult.saptawara} (${todayResult.saptawaraTranslated})`)
console.log(`  Pancawara: ${todayResult.pancawara}`)
console.log(`  Position in 210-day cycle: ${todayResult.pawukonPosition}`)
console.log(`  Bhatara: ${todayResult.wuku.bhatara}`)
console.log(`  Days to next Galungan: ${todayResult.galunganDistance}`)

console.log('')
console.log('=== Sample Birth Dates ===')
const samples = ['1990-01-01', '1995-06-15', '2000-12-25', '2005-03-17', '2010-07-04', '1945-08-17']
for (const s of samples) {
  const r = getWukuByDate(s)
  console.log(`${s} → Wuku ${r.wuku.name} (${r.wuku.order}/30) — ${r.saptawaraTranslated} ${r.pancawara}`)
}
