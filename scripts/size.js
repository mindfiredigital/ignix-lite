import { readFileSync } from "fs";
import { gzipSync } from "zlib";

const file = readFileSync("packages/core/ignix-lite.min.css");

const raw = file.length;
const gzip = gzipSync(file).length;

console.log("Raw size:", (raw / 1024).toFixed(2), "KB");
console.log("Gzip size:", (gzip / 1024).toFixed(2), "KB");
