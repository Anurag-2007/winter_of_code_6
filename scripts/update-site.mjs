#!/usr/bin/env node
/**
 * One-stop updater for the Winter of Code site.
 *
 *   node scripts/update-site.mjs --edition 7.0 --reg-start 20-12-2027 --reg-end 31-12-2027
 *   node scripts/update-site.mjs --reg-start 22-12-2026 --reg-end 02-01-2027
 *   node scripts/update-site.mjs --register-link https://woc7.devfolio.co
 *   node scripts/update-site.mjs --reset-events          # empty data/events.json -> "Coming Soon"
 *   node scripts/update-site.mjs --check                 # report stale edition mentions
 *   add --dry-run to any command to preview without writing
 *
 * Dates are DD-MM-YYYY (same format as data/timeline.json).
 *
 * What it touches:
 *   data/site.json      edition + registration link (components read these)
 *   data/timeline.json  the "Student Applications" entry (registration window)
 *   data/events.json    reset to [] with --reset-events
 *   README.md, package.json  edition string
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = (p) => path.join(root, p);
const readJson = (p) => JSON.parse(fs.readFileSync(file(p), "utf8"));

// ---- args -----------------------------------------------------------------
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => ["--dry-run", "--check", "--reset-events", "--help"].includes(a)));
const opt = (name) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : undefined;
};
const dry = flags.has("--dry-run");

if (flags.has("--help") || args.length === 0) {
  console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0].replace("#!/usr/bin/env node\n", ""));
  process.exit(0);
}

// ---- helpers --------------------------------------------------------------
const DATE_RE = /^(\d{2})-(\d{2})-(\d{4})$/;
const toDate = (s) => {
  const m = DATE_RE.exec(s ?? "");
  if (!m) throw new Error(`Bad date "${s}" - use DD-MM-YYYY`);
  const d = new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]));
  if (d.getUTCDate() !== +m[1] || d.getUTCMonth() !== +m[2] - 1) throw new Error(`Date "${s}" does not exist`);
  return d;
};

const changes = [];
const write = (p, content) => {
  const prev = fs.existsSync(file(p)) ? fs.readFileSync(file(p), "utf8") : "";
  if (prev === content) return;
  changes.push(p);
  if (!dry) fs.writeFileSync(file(p), content);
};
const writeJson = (p, obj) => write(p, JSON.stringify(obj, null, 2) + "\n");

// ---- --check --------------------------------------------------------------
if (flags.has("--check")) {
  const { edition } = readJson("data/site.json");
  const skip = new Set(["past-organizations.tsx", "pastOrgs.json", "pastStats.json", "package-lock.json", "UPDATING.md", "update-site.mjs"]);
  const re = /\b(WoC|WOC|Winter of Code|Winter-of-Code)[ -]?(\d+)(?:\.0|-0)?\b/gi;
  let stale = 0;
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (["node_modules", ".git", ".next", "public"].includes(e.name)) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(tsx?|json|md|mjs)$/.test(e.name) && !skip.has(e.name)) {
        fs.readFileSync(full, "utf8").split("\n").forEach((line, i) => {
          for (const m of line.matchAll(re)) {
            if (`${m[2]}.0` !== edition) {
              stale++;
              console.log(`${path.relative(root, full)}:${i + 1}  "${m[0]}" (current edition is ${edition})`);
            }
          }
        });
      }
    }
  };
  walk(root);
  console.log(stale ? `\n${stale} possibly stale mention(s). Historical references (past editions) are fine.` : `No stale edition mentions. Edition is ${edition}.`);
  process.exit(0);
}

// ---- edition / link -------------------------------------------------------
const site = readJson("data/site.json");
const newEdition = opt("--edition");
const newLink = opt("--register-link");

if (newEdition) {
  if (!/^\d+\.0$/.test(newEdition)) throw new Error('--edition must look like "7.0"');
  site.edition = newEdition;
}
if (newLink) site.registrationLink = newLink;
if (newEdition || newLink) writeJson("data/site.json", site);

if (newEdition) {
  const e = site.edition;
  // README title + closing line
  const readme = fs.readFileSync(file("README.md"), "utf8").replace(/Winter of Code \d+\.0/g, `Winter of Code ${e}`);
  write("README.md", readme);
  // package name
  const pkg = readJson("package.json");
  pkg.name = `woc${e}`;
  writeJson("package.json", pkg);
}

// ---- registration window --------------------------------------------------
const regStart = opt("--reg-start");
const regEnd = opt("--reg-end");
if (regStart || regEnd) {
  const timeline = readJson("data/timeline.json");
  const entry = timeline.find((t) => /application|registration/i.test(t.title));
  if (!entry) throw new Error('No "Student Applications" entry in data/timeline.json');
  const start = regStart ?? entry.startDate;
  const end = regEnd ?? entry.endDate;
  if (toDate(start) > toDate(end)) throw new Error("Registration start is after end");
  entry.startDate = start;
  entry.endDate = end;
  writeJson("data/timeline.json", timeline);

  // Warn if later phases now start before registration closes
  const closes = toDate(end);
  for (const t of timeline) {
    if (t !== entry && toDate(t.startDate) < closes) console.warn(`! "${t.title.replace("\n", " ")}" starts ${t.startDate}, before registration closes (${end})`);
  }
}

// ---- events ---------------------------------------------------------------
if (flags.has("--reset-events")) write("data/events.json", "[]\n");

// ---- summary --------------------------------------------------------------
console.log(changes.length ? `${dry ? "[dry run] would update" : "Updated"}:\n  ${changes.join("\n  ")}` : "Nothing to change.");
if (newEdition) console.log(`\nNext: also update the timeline phase dates in data/timeline.json, then run "npm run site:check".`);
