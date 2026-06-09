#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# test-mcp.sh  — Manual smoke-test of Ignix-Lite MCP over stdio
# Usage: bash my-skill/scripts/test-mcp.sh
# Requires: node >= 18, pnpm workspace built (pnpm build from repo root)
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

MCP_SERVER="node packages/mcp/dist/server.js"
PASS=0
FAIL=0

run_tool() {
  local tool="$1"
  local args="$2"
  local description="$3"

  local payload
  payload=$(printf '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"%s","arguments":%s}}' "$tool" "$args")

  local response
  response=$(echo "$payload" | $MCP_SERVER 2>/dev/null)

  if echo "$response" | grep -q '"error"'; then
    echo "  ✗ FAIL  [$tool] $description"
    echo "    Response: $response"
    FAIL=$((FAIL + 1))
  else
    echo "  ✓ PASS  [$tool] $description"
    PASS=$((PASS + 1))
  fi
}

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Ignix-Lite MCP Smoke Tests"
echo "═══════════════════════════════════════════════════════"
echo ""

# ── 1. list_components ───────────────────────────────────────────────────────
echo "── list_components ─────────────────────────────────────"
run_tool "list_components" "{}" "Returns component list"

# ── 2. get_manifest ─────────────────────────────────────────────────────────
echo ""
echo "── get_manifest ────────────────────────────────────────"
run_tool "get_manifest" '{"name":"button"}' "button manifest"
run_tool "get_manifest" '{"name":"input"}'  "input manifest"
run_tool "get_manifest" '{"name":"dialog"}' "dialog manifest"
run_tool "get_manifest" '{"name":"grid"}'   "grid manifest"

# ── 3. get_emmet ────────────────────────────────────────────────────────────
echo ""
echo "── get_emmet ───────────────────────────────────────────"
run_tool "get_emmet" '{"name":"button"}'   "button emmet"
run_tool "get_emmet" '{"name":"select"}'   "select emmet"
run_tool "get_emmet" '{"name":"tooltip"}'  "tooltip emmet"

# ── 4. validate ─────────────────────────────────────────────────────────────
echo ""
echo "── validate ────────────────────────────────────────────"
run_tool "validate" '{"html":"<button data-intent=\"primary\">Save</button>"}' \
  "valid button"
run_tool "validate" '{"html":"<button class=\"btn-primary\">Save</button>"}' \
  "invalid — class attr (should report FORBIDDEN_CLASS)"
run_tool "validate" '{"html":"<button data-intent=\"destructive\">Del</button>"}' \
  "invalid — bad enum value (should report INVALID_VALUE)"
run_tool "validate" '{"html":"<input data-intent=\"text\" type=\"text\" required>"}' \
  "valid input"

# ── 5. how_to_build ─────────────────────────────────────────────────────────
echo ""
echo "── how_to_build ────────────────────────────────────────"
run_tool "how_to_build" '{"description":"a danger button to delete a record"}' \
  "single danger button"
run_tool "how_to_build" '{"description":"a search input and a submit button"}' \
  "stitched input + button"
run_tool "how_to_build" '{"description":"a success alert message"}' \
  "success alert"
run_tool "how_to_build" '{"description":"loading skeleton card"}' \
  "skeleton card"

# ── 6. generate_theme ───────────────────────────────────────────────────────
echo ""
echo "── generate_theme ──────────────────────────────────────"
run_tool "generate_theme" '{"prompt":"dark blue sharp"}' \
  "dark blue sharp theme"
run_tool "generate_theme" '{"prompt":"light green round"}' \
  "light green round theme"
run_tool "generate_theme" '{"prompt":"midnight purple pill"}' \
  "midnight purple pill theme"

# ── 7. check_a11y ───────────────────────────────────────────────────────────
echo ""
echo "── check_a11y ──────────────────────────────────────────"
run_tool "check_a11y" \
  '{"html":"<html lang=\"en\"><body><img src=\"x.jpg\" alt=\"Alt text\"><button>OK</button></body></html>"}' \
  "passing accessible HTML"
run_tool "check_a11y" \
  '{"html":"<img src=\"x.jpg\"><button></button><a href=\"/\"></a>"}' \
  "failing — missing alt, empty button/link, no lang"

# ── Summary ──────────────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════"
echo "  Results: $PASS passed, $FAIL failed"
echo "═══════════════════════════════════════════════════════"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
