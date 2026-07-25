const {
  id,
  isId,
  getPrefix,
  sortableId,
  getTimestamp,
  getTimestampOrThrow,
  getDate,
} = require("prefid");

const uid = id("user");

if (!isId(uid, "user") || getPrefix(uid) !== "user") {
  console.error("smoke failed: CJS build did not produce a valid id");
  process.exit(1);
}

const sid = sortableId("evt");
if (
  !isId(sid, "evt") ||
  typeof getTimestamp(sid) !== "number" ||
  typeof getTimestampOrThrow(sid) !== "number" ||
  !(getDate(sid) instanceof Date)
) {
  console.error("smoke failed: CJS build did not produce a valid sortable id");
  process.exit(1);
}

console.log(
  `✅ prefid CJS smoke passed on Node ${process.versions.node} — ${uid} / ${sid}`,
);
