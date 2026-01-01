# Waystone

AI Code Quality Audit Plugin for Claude Code.

## Purpose

Catch recurring AI implementation failures:
- Dead code never connected to the application
- Skipped research leading to wrong assumptions
- Sledgehammer fixes instead of understanding
- Missing behavioral tests
- Code that doesn't trace to requirements

## Status

Planning phase. See `PLAN.md` for full roadmap.

## Structure

```
waystone/
├── PLAN.md              # Roadmap and design
├── CLAUDE.md            # This file
├── plugin.json          # Plugin manifest (TODO)
├── commands/            # Slash commands (TODO)
├── agents/              # Audit agents (TODO)
└── skills/              # Quality criteria loaders (TODO)
```

## Development Notes

This plugin will be developed using the plugin-dev tools from claude-plugins-official.
