#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"

printf "Starting CRNA/SRNA Study Guide on http://localhost:%s\n" "$PORT"
printf "Press Ctrl+C to stop.\n"
python -m http.server "$PORT"
