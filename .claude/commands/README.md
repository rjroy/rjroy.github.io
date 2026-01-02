# Claude Code Commands

Pre-configured commands for working with this digital garden.

## Available Commands

### Thinking & Research

#### /thinking-partner

Engage Claude as a thinking partner for exploring complex problems.

```
/thinking-partner
```

Best for: Brainstorming, problem exploration, developing ideas

#### /research-assistant

Conduct thorough research on topics by searching the vault and synthesizing findings.

```
/research-assistant
```

Best for: Deep dives, literature reviews, knowledge synthesis

### Daily & Weekly Reviews

#### /daily-review

Structured end-of-day review to capture progress and plan tomorrow.

```
/daily-review
```

Best for: Daily shutdown ritual, reflection

#### /daily-debrief

Quick, focused 5-10 minute conversation to capture what matters from today.

```
/daily-debrief
```

Best for: Light daily check-ins when time is short

#### /weekly-debrief

Guided conversation to process and remember what was important this week.

```
/weekly-debrief
```

Best for: Weekly patterns, planning ahead

#### /weekly-synthesis

Create a comprehensive synthesis of the week's work.

```
/weekly-synthesis
```

Best for: Weekly reviews, pattern recognition

#### /monthly-summary

Generate a monthly summary and open tasks report from periodic notes.

```
/monthly-summary [YEAR] [MONTH]
```

Best for: Monthly reviews, task tracking

### Organization & Utilities

#### /inbox-processor

Process and organize items in the Inbox folder according to PARA method.

```
/inbox-processor
```

Best for: Weekly inbox cleanup, organizing captures

#### /download-attachment

Download files from URLs to attachments folder.

```
/download-attachment <url>
```

Best for: Saving web content to vault

#### /add-frontmatter

Add or update YAML frontmatter properties to enhance note organization.

```
/add-frontmatter [file or folder path]
```

Best for: Batch metadata updates

#### /de-ai-ify

Remove AI-generated patterns and restore natural human voice to writing.

```
/de-ai-ify [file_path]
```

Best for: Cleaning up AI-assisted drafts

### Development

#### /pull-request

Create a feature branch, commit changes, push to GitHub, and open a PR.

```
/pull-request
```

Best for: Contributing changes

#### /create-command

Create a new Claude Code slash command.

```
/create-command [description]
```

Best for: Extending this command set

## Creating Custom Commands

1. Create a new `.md` file in this directory
2. Name it descriptively (kebab-case)
3. Structure it with:
   - Clear role definition
   - Specific process steps
   - Expected output format
   - Tips and constraints
