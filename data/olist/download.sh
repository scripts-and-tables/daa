#!/usr/bin/env bash
# Downloads the Olist Brazilian E-commerce dataset into this directory.
#
# Requires the Kaggle CLI:
#   pip install kaggle
#   then put your kaggle.json API token in ~/.kaggle/kaggle.json
#   (Kaggle account -> Settings -> API -> Create New Token)
#
# If you don't want to set up the CLI, see the manual instructions printed
# at the bottom when this script fails.

set -euo pipefail

DEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATASET="olistbr/brazilian-ecommerce"

echo "Downloading $DATASET into $DEST_DIR ..."

if ! command -v kaggle >/dev/null 2>&1; then
    cat <<EOF
ERROR: kaggle CLI not found.

Option A — install Kaggle CLI:
  pip install kaggle
  # then put your API token in ~/.kaggle/kaggle.json (chmod 600)
  # see https://github.com/Kaggle/kaggle-api

Option B — manual download (no CLI needed):
  1. Open https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce
  2. Click "Download" (top right) — you'll get archive.zip
  3. Unzip into this directory: $DEST_DIR
  4. You should end up with ~8 CSV files alongside this script.
EOF
    exit 1
fi

kaggle datasets download -d "$DATASET" -p "$DEST_DIR" --unzip

echo
echo "Done. Files in $DEST_DIR:"
ls -1 "$DEST_DIR"/*.csv
