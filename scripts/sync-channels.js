/**
 * IBLOCK 170 (შემომავალი არხი) სახელების სინქრონიზაცია.
 * საჭიროა webhook-ზე iblock / lists უფლება.
 * გაშვება: node scripts/sync-channels.js
 */
const fs = require("fs");
const path = require("path");

const API_BASE =
  process.env.CRM_API_BASE ||
  "https://crm.archi.ge/rest/1/1tol0pczy0mvbzmu";
const IBLOCK_ID = 170;

async function apiPost(method, body) {
  const res = await fetch(`${API_BASE}/${method}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(`${data.error}: ${data.error_description || ""}`);
  return data;
}

async function fetchAllChannels() {
  const map = {};
  let start = 0;
  while (true) {
    const data = await apiPost("iblock.Element.list", {
      iblockId: IBLOCK_ID,
      select: ["ID", "NAME"],
      order: { ID: "ASC" },
      start,
    });
    for (const el of data.result?.elements || []) {
      map[String(el.ID)] = el.NAME;
    }
    const batch = data.result?.elements || [];
    if (!data.next && batch.length < 50) break;
    if (data.next != null) start = data.next;
    else break;
  }
  return map;
}

async function main() {
  const out = path.join(__dirname, "..", "data", "channels.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const map = await fetchAllChannels();
  fs.writeFileSync(out, `${JSON.stringify(map, null, 2)}\n`, "utf8");
  console.log(`OK → ${out} (${Object.keys(map).length} არხი)`);
}

main().catch((err) => {
  console.error("sync-channels failed:", err.message);
  console.error("დაამატეთ webhook-ზე iblock/lists უფლება ან შეავსეთ data/channels.json ხელით.");
  process.exit(1);
});
