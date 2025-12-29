# Attachments

Storage for images, PDFs, and other non-text files.

## Purpose

Centralized location for:
- Images and screenshots
- PDFs and documents
- Spreadsheets and data files
- Audio and video files
- Any binary files referenced in notes

## Organization

```
05_Attachments/
├── Organized/          # Processed files with good names
│   ├── Images/
│   ├── PDFs/
│   └── Data/
├── IMG_*.png          # Unprocessed phone images
├── Screenshot*.png    # Unprocessed screenshots
└── *.pdf             # Various PDFs
```

## Naming Conventions

### Before Processing
- `IMG_1234.png` (from phone)
- `Screenshot 2024-03-15 at 2.30.45 PM.png`
- `document(1).pdf`

### After Processing
- `2024-03-15_Project_Architecture_Diagram.png`
- `2024-03-15_Meeting_Whiteboard.jpg`
- `API_Documentation_v2.pdf`
- `Customer_Interview_Transcript.pdf`

## Claude Code Workflows

### Process Screenshots
```
Look at recent screenshots in 05_Attachments.
Based on their content, suggest better names.
Help me organize them.
```

### Find Orphans
```
Find all attachments not referenced in any notes.
Should any be deleted?
```

### Rename Batch
```
Review unprocessed images in Attachments.
Suggest descriptive names based on content.
```

### Clean Up
```
Find duplicate images in Attachments.
Find files over 10MB.
What can be compressed or removed?
```

## Best Practices

### File Sizes
- Keep images under 2MB for Git
- Compress large PDFs
- Use external storage for video
- Optimize images before committing

### Naming
- Include date: `YYYY-MM-DD`
- Be descriptive but concise
- Use underscores not spaces
- Include version numbers if relevant

### Linking
```markdown
# Embedding images
![[05_Attachments/Organized/diagram.png]]

# Linking PDFs
[[05_Attachments/Organized/document.pdf]]

# With descriptions
![[05_Attachments/Organized/chart.png|Sales Chart Q1]]
```

## Processing Workflow

1. **Capture**: Save files to `05_Attachments/`
2. **Review**: Look at content, determine purpose
3. **Rename**: Give descriptive, dated name
4. **Organize**: Move to `Organized/` subfolder
5. **Link**: Update references in notes
6. **Clean**: Remove orphaned files

## Tips

- **Process weekly** - Don't let files pile up
- **Name immediately** - Context fades fast
- **Link purposefully** - Only embed what adds value
- **Compress aggressively** - Storage adds up
- **Delete liberally** - Not every screenshot matters

## Git Considerations

### .gitignore suggestions
```
*.mp4
*.mov
*.zip
.DS_Store
```

### For Large Files
- Use Git LFS for files over 10MB
- Consider external storage
- Link to cloud storage instead
- Keep local but gitignore

## Remember

Attachments support your notes, they don't replace them. A well-named, well-organized attachment is worth a thousand random screenshots.
