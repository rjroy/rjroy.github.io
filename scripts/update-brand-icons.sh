#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRAND_DIR="$SCRIPT_DIR/../brand/"
PUBLIC_DIR="$SCRIPT_DIR/../public/"

cp $BRAND_DIR/assets/approved-a5.svg $PUBLIC_DIR/assets/approved-a5.svg
rsvg-convert --format png --width 180 --height 180 --output $PUBLIC_DIR/apple-touch-icon.png $PUBLIC_DIR/assets/approved-a5.svg
rsvg-convert --format png --width 48 --height 48 --output $PUBLIC_DIR/favicon.png $PUBLIC_DIR/assets/approved-a5.svg
cwebp -lossless -exact -q 100 -alpha_q 100 -m 6 -metadata none $PUBLIC_DIR/favicon.png -o $PUBLIC_DIR/favicon.webp
rm $PUBLIC_DIR/favicon.png
