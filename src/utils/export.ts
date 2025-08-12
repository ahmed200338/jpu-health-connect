import * as XLSX from "xlsx";

export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  const csvContent = [
    Object.keys(rows[0] || {}).join(","),
    ...rows.map((r) => Object.values(r).map(safe).join(",")),
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  link.click();
}

export function exportToXLSX(filename: string, rows: Record<string, any>[]) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}

function safe(v: any) {
  if (v == null) return "";
  if (typeof v === "string") return `"${v.replace(/"/g, '""')}"`;
  return v;
}
