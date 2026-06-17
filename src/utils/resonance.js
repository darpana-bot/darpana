export function logSadhanaResonance(payload) {
  try {
    fetch('/api/resonance/sadhana', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => console.warn('[resonance] sadhana log failed:', err.message))
  } catch (err) {
    console.warn('[resonance] sadhana log failed:', err.message)
  }
}
export function logAIResonance(payload) {
  try {
    fetch('/api/resonance/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => console.warn('[resonance] AI log failed:', err.message))
  } catch (err) {
    console.warn('[resonance] AI log failed:', err.message)
  }
}
export async function submitRtaImbalance(payload) {
  try {
    const res = await fetch('/api/resonance/rta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Gagal mengirim pantulan.')
    return data
  } catch (err) {
    console.error('[resonance] rta submit failed:', err.message)
    throw err
  }
}
