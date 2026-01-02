# download-attachment

Download files from URLs to attachments folder and organize them with
descriptive names.

## Usage

```
/download-attachment <url1> [url2] [url3...]
```

## Examples

```
/download-attachment https://example.com/document.pdf
/download-attachment https://site.com/image.png https://site.com/report.pdf
```

## Implementation

You are tasked with downloading files from URLs and organizing them in the
Obsidian vault attachments folder.

### Step 1: Parse and Validate URLs

Extract the URL(s) from the user's input. Handle multiple URLs if provided.

- **Validate URL scheme**: Only allow http:// or https:// URLs
- **Reject invalid URLs**: file://, ftp://, or malformed URLs
- **Example validation**:

```bash
if [[ ! "$url" =~ ^https?:// ]]; then
  echo "Error: Only HTTP/HTTPS URLs are allowed"
  exit 1
fi
```

### Step 2: Download Files

For each URL:

```bash
# Sanitize filename to prevent path traversal
# Remove ../ and other dangerous characters
filename=$(basename "$url" | sed 's/[^a-zA-Z0-9._-]/_/g')

# Use wget or curl to download with timeout
wget --timeout=30 -O "content/05_Attachments/$filename" "$url"
# or
curl --max-time 30 -L "$url" -o "content/05_Attachments/$filename"
```

### Step 3: Verify Downloads

Check that files were downloaded successfully:

```bash
ls -la "content/05_Attachments/"
```

### Step 4: Organize Files

After downloading, run the organize-attachments command to rename files with
descriptive names:

For PDFs:

- Extract text with `pdftotext`
- Analyze content for meaningful title

For Images:

- Use `mcp__gemini-vision__analyze_image` or
  `mcp__gemini-vision__analyze_multiple`
- Generate descriptive filename based on content

### Step 5: Move to Organized

Move renamed files to `content/05_Attachments/Organized/` with descriptive names

### Step 6: Update Index

Add entries to `content/05_Attachments/00_Index.md`

### Step 7: Commit Changes

```bash
git add -A
git commit -m "Download and organize attachments from URLs"
git push
```

## Important Notes

1. **File Naming**:
   - Initial download: Use URL filename or generate from URL
   - After analysis: Rename with descriptive title

2. **Supported Types**:
   - Images: .png, .jpg, .jpeg, .gif, .webp
   - Documents: .pdf, .doc, .docx
   - Text: .txt, .md
   - Data: .csv, .xlsx

3. **Error Handling**:
   - Check if URL is accessible
   - Verify file downloaded correctly
   - Handle download failures gracefully

4. **Organization**:
   - Downloaded files go to `content/05_Attachments/`
   - After renaming, move to `content/05_Attachments/Organized/`
   - Update links across vault if needed

## Workflow

1. Download file(s) from provided URL(s)
2. Identify file type and analyze content
3. Generate descriptive filename
4. Move to Organized folder
5. Update index and references
6. Commit and push changes

## Tips

- For multiple URLs, process them in batch for efficiency
- Use Gemini Vision for batch image analysis (up to 3 at once)
- Extract meaningful context from PDFs before renaming
- Preserve original file extensions
- Keep filenames concise but descriptive (max 60 chars)
