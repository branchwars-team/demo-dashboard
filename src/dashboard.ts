import { monthlyRevenue, orders, stats } from "./data";

function exportCsv(): void {
  const rows = [["id", "customer", "status", "amount"], ...orders.map((o) => Object.values(o))];
  const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "orders.csv";
  link.click();
  document.querySelector("#export-status")!.textContent = "Exported orders.csv";
}

function renderBarChart(): string {
  const max = Math.max(...monthlyRevenue.map((m) => m.value));
  return `
    <div class="bar-chart" role="img" aria-label="Monthly revenue bar chart">
      ${monthlyRevenue
        .map(
          (m) => `
            <div class="bar-col">
              <span class="bar-value">${m.value}</span>
              <div class="bar" style="height: ${Math.round((m.value / max) * 160)}px"></div>
              <span class="bar-label">${m.month}</span>
            </div>`,
        )
        .join("")}
    </div>
  `;
}

export function renderDashboard(): string {
  queueMicrotask(() => document.querySelector("#export")?.addEventListener("click", exportCsv));
  const updated = new Date().toUTCString();

  return `
    <header class="page-header">
      <div>
        <div class="title-row">
          <h1>Dashboard</h1>
          <button id="export-button" class="button" data-testid="export">Export</button>
        </div>
        <p class="muted">Last updated ${updated}</p>
      </div>
    </header>
    <p id="export-status" class="muted" role="status"></p>

    <section class="stats">
      ${stats
        .map((s) => `<div class="card stat"><span class="muted">${s.label}</span><strong>${s.value}</strong></div>`)
        .join("")}
    </section>

    <section class="card chart-card">
      <h2>Monthly revenue <span class="muted">($k)</span></h2>
      ${renderBarChart()}
    </section>

    <section class="card">
      <h2>Recent orders</h2>
      <table>
        <thead><tr><th>Order</th><th>Customer</th><th>Status</th><th>Amount</th></tr></thead>
        <tbody>
          ${orders
            .map((o) => `<tr><td>${o.id}</td><td>${o.customer}</td><td>${o.status}</td><td>${o.amount}</td></tr>`)
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}
