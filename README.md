# PARA Vault: Claude Code + Obsidian

A simple Obsidian vault structure designed for use with Claude Code and the PARA organization method.

## What is this?

A pre-configured vault structure that enables:

- AI-assisted knowledge management
- Organization using the PARA method
- Version control with Git
- Seamless Claude Code integration

## Folder Structure

```
vault/
├── 00_Inbox/           # Capture point for new ideas
├── 01_Projects/        # Active, time-bound initiatives
├── 02_Areas/           # Ongoing responsibilities
├── 03_Resources/       # Reference materials and knowledge base
├── 04_Archive/         # Completed projects and inactive items
├── 05_Attachments/     # Images, PDFs, and other files
└── 06_Metadata/        # Configuration and templates
    ├── Reference/      # Documentation and guides
    └── Templates/      # Reusable note templates
```

## Getting Started

### 1. Open in Claude Code

```bash
cd your-vault-directory
claude
```

### 2. Open in Obsidian (Optional)

- Download [Obsidian](https://obsidian.md)
- Open vault from this folder
- This gives you a visual interface alongside Claude Code

### 3. Start Using It

Tell Claude Code:

```
I'm starting a new project about [topic].
Please search my vault for any relevant existing notes,
then help me explore this topic by asking questions.
```

## Key Concepts

### Thinking Mode vs Writing Mode

**Thinking Mode** (Research & Exploration):
- Claude asks questions to understand your goals
- Searches existing notes for relevant content
- Helps make connections between ideas

**Writing Mode** (Content Creation):
- Generates drafts based on your research
- Helps structure and edit content
- Creates final deliverables

### The PARA Method

**Projects**: Have a deadline and specific outcome
- Example: "Q4 2025 Marketing Strategy"
- Create a folder in `01_Projects/`

**Areas**: Ongoing without an end date
- Example: "Health", "Finances", "Team Management"
- Lives in `02_Areas/`

**Resources**: Topics of ongoing interest
- Example: "AI Research", "Writing Tips"
- Store in `03_Resources/`

**Archive**: Inactive items
- Completed projects with their outputs
- Old notes no longer relevant

## Common Workflows

### Weekly Review
```
Look at all notes created this week.
What are the main themes?
What connections exist between different projects?
```

### Process Inbox
```
Review items in 00_Inbox.
Suggest where each should be moved based on PARA method.
```

### Project Status
```
Review the project in [folder].
What's the current status?
What are the next actions needed?
```

### Find Connections
```
Search my vault for anything related to [topic].
What patterns or connections do you see?
```

## Tips

1. **Start in thinking mode**: Resist the urge to generate content immediately
2. **Capture everything**: Save thoughts, fragments, partial ideas
3. **Process regularly**: Review your inbox weekly
4. **Trust but verify**: Always read AI-generated content
5. **Link liberally**: Connections create value

## Resources

- [Obsidian Documentation](https://help.obsidian.md)
- [PARA Method](https://fortelabs.com/blog/para/)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)

## License

MIT - Use this however you want.
