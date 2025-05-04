#!/bin/bash

echo "🔍 Checking for sitemap files..."

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."
DIST_DIR="$PROJECT_ROOT/dist"

# If dist directory doesn't exist yet, create it
if [ ! -d "$DIST_DIR" ]; then
  echo "Creating dist directory..."
  mkdir -p "$DIST_DIR"
fi

# Check for root sitemap.xml
if [ -f "$PROJECT_ROOT/sitemap.xml" ]; then
  echo "Found sitemap.xml in project root - copying to dist..."
  cp "$PROJECT_ROOT/sitemap.xml" "$DIST_DIR/sitemap.xml"
elif [ -f "$PROJECT_ROOT/public/sitemap.xml" ]; then
  echo "Found sitemap.xml in public folder - copying to dist..."
  cp "$PROJECT_ROOT/public/sitemap.xml" "$DIST_DIR/sitemap.xml"
else
  echo "❌ WARNING: No sitemap.xml found!"
fi

# Check for HTML sitemap
if [ -f "$PROJECT_ROOT/public/sitemap.html" ]; then
  echo "Found sitemap.html - copying to dist..."
  cp "$PROJECT_ROOT/public/sitemap.html" "$DIST_DIR/sitemap.html"
fi

# Check for TXT sitemap
if [ -f "$PROJECT_ROOT/public/sitemap.txt" ]; then
  echo "Found sitemap.txt - copying to dist..."
  cp "$PROJECT_ROOT/public/sitemap.txt" "$DIST_DIR/sitemap.txt"
fi

# Verify the files exist in dist
if [ -f "$DIST_DIR/sitemap.xml" ]; then
  echo "✅ sitemap.xml successfully copied to dist directory ($(wc -c < "$DIST_DIR/sitemap.xml") bytes)"
fi

if [ -f "$DIST_DIR/sitemap.html" ]; then
  echo "✅ sitemap.html successfully copied to dist directory"
fi

if [ -f "$DIST_DIR/sitemap.txt" ]; then
  echo "✅ sitemap.txt successfully copied to dist directory"
fi

echo "🔍 Sitemap verification complete"
