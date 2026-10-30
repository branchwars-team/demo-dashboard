// Deliberate noise for BranchWars' Noise Hunter: a new value on every load, from a source the
// capture step does not freeze (it seeds Math.random and fixes the clock, not crypto).
function sessionId(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

export function renderHome(): string {
  return `
    <section class="hero">
      <h1>Welcome to Acme Analytics</h1>
      <p>Track orders, revenue and customers in one place.</p>
      <a class="button" href="/dashboard">Open dashboard</a>
      <p class="session" data-testid="session-id">Session ${sessionId()}</p>
    </section>
    <section class="features">
      <div class="card"><h3>Live metrics</h3><p>Key numbers for your store, updated every hour.</p></div>
      <div class="card"><h3>Order history</h3><p>Every order with status and amount.</p></div>
      <div class="card"><h3>Exports</h3><p>Download your data as CSV whenever you need it.</p></div>
    </section>
  `;
}
