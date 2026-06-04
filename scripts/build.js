const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const dataDir = path.join(dist, "data");

fs.mkdirSync(dataDir, { recursive: true });
fs.copyFileSync(path.join(root, "index.html"), path.join(dist, "index.html"));

const channelsSrc = path.join(root, "data", "channels.json");
if (fs.existsSync(channelsSrc)) {
  fs.copyFileSync(channelsSrc, path.join(dataDir, "channels.json"));
}

console.log("Build OK → dist/index.html");
