# Waystone: AI Code Quality Audit Plugin

A Claude Code plugin to enforce code quality and catch AI implementation failures.

## Problem Statement

AI-generated code suffers from recurring issues:
1. **Dead code**: Files written but never connected to the application
2. **Skipped research**: AI assumes API behavior instead of reading docs
3. **Sledgehammer fixes**: Guessing and patching instead of understanding
4. **Missing tests**: Structural coverage without behavioral verification
5. **Spec drift**: Code that doesn't trace back to any requirement

## Goals

- Make research produce visible artifacts
- Define quality as verifiable criteria, not just process steps
- Audit existing codebases to retrofit quality
- Catch issues at creation time and after the fact

---

## Action Items

### 1. Quality Definitions

#### 1.1 Universal Quality Criteria
Define what quality means across all projects:
- Logging: error paths and key operations logged
- Testing: public functions tested, error paths tested
- Error handling: meaningful, not swallowed
- Documentation: public APIs documented
- No hardcoded secrets

#### 1.2 Project-Specific Quality Criteria
Define per-project standards:
- Coverage thresholds (e.g., 80%)
- File size limits (e.g., 500 lines)
- Function size limits (e.g., 50 lines)
- Domain-specific invariants

#### 1.3 Quality Definition File
Create `.audit/quality.yaml` schema:
```yaml
universal:
  logging:
    - error paths must log
    - key operations must log
  testing:
    - public functions have tests
    - error paths have tests

project:
  coverage_threshold: 80
  max_file_lines: 500
  max_function_lines: 50
```

---

### 2. Research Requirements

#### 2.1 Update CLAUDE.md Workflow
Make research produce artifacts, not just "I looked at it":
```markdown
## Research Requirements

Research is MANDATORY when:
- Calling any API you haven't used in this session
- Modifying code you didn't write
- Implementing something you haven't done before

Research output must include:
- Source (URL, file path, or doc reference)
- Key facts learned
- How this affects the implementation

Do not proceed to Plan until research is documented.
```

---

### 3. Plugin Structure

```
waystone/
├── plugin.json
├── CLAUDE.md
├── commands/
│   ├── audit-init.md        # Build checklist of files to audit
│   ├── audit-run.md         # Process checklist with agents
│   ├── audit-dead-code.md   # Find unreachable/orphaned code
│   └── audit-connectedness.md  # Trace files to entry points
├── agents/
│   ├── structural-auditor.md   # Metrics: size, coverage, logging presence
│   ├── semantic-auditor.md     # Does code match its stated purpose?
│   ├── api-contract-auditor.md # Were docs read or did AI guess?
│   └── spec-tracer.md          # Links code back to requirements
└── skills/
    ├── quality-universal.md    # Loads universal quality criteria
    └── quality-project.md      # Loads project-specific criteria
```

---

### 4. Commands

#### 4.1 `/waystone:audit-init`
Build a checklist of all files that need auditing.
- Enumerate files in scope (configurable: all, changed, specific paths)
- Output: `.audit/checklist.md` with status for each file

#### 4.2 `/waystone:audit-run`
Process the checklist by running agents against each file.
- Read checklist
- For each pending file, invoke appropriate agents
- Mark files as audited with findings
- Generate summary report

#### 4.3 `/waystone:audit-dead-code`
Find unreachable code.
- Identify all entry points (main, routes, exports)
- Build import/call graph
- Report files not reachable from any entry point

#### 4.4 `/waystone:audit-connectedness`
Trace files to entry points.
- For a given file, show the path from entry point to that file
- If no path exists, flag as orphaned

---

### 5. Agents

#### 5.1 `structural-auditor`
Audit a single file against structural quality metrics:
- File size within limits
- Function/method size within limits
- Logging present for errors and key operations
- Tests exist for public functions
- No hardcoded secrets

#### 5.2 `semantic-auditor`
Audit a single file for semantic correctness:
- Does the code do what its name/comments claim?
- Are there obvious logic errors?
- Do tests verify behavior, not just structure?

#### 5.3 `api-contract-auditor`
Check that API usage is informed, not guessed:
- For each external/unfamiliar API call:
  - Is there evidence docs were consulted?
  - Does error handling match documented failure modes?
  - Are return types explicitly handled (not inferred from trial)?
- Flag sledgehammer patterns (excessive try/catch, type coercion chains)

#### 5.4 `spec-tracer`
Trace code back to requirements:
- For each file, identify the issue/spec/requirement it implements
- Flag files with no traceability
- Verify implementation matches stated requirement

---

### 6. Skills

#### 6.1 `quality-universal`
Load universal quality criteria from config.
Provide to agents as evaluation baseline.

#### 6.2 `quality-project`
Load project-specific quality criteria.
Override/extend universal criteria.

---

## Implementation Order

1. **Quality definition file schema**: Foundation everything references
2. **Research requirements update**: Immediate improvement to CLAUDE.md
3. **`structural-auditor` agent**: Simplest, proves the pattern
4. **`audit-init` command**: Generates checklist
5. **`audit-run` command**: Processes checklist
6. **`audit-dead-code` command**: Catches orphaned files
7. **`api-contract-auditor` agent**: Catches sledgehammer fixes
8. **`semantic-auditor` agent**: Hardest, most valuable
9. **`spec-tracer` agent**: Requires project to have specs
10. **`audit-connectedness` command**: Detailed tracing

---

## Open Questions

- Should audit results persist in `.audit/` or in a database?
- How to handle false positives without creating noise fatigue?
- Integration with CI/CD for automated auditing?
- How to audit test files themselves?

---

## Success Criteria

Waystone is successful when:
1. Dead code is caught before merge
2. AI-generated code shows evidence of research
3. Sledgehammer patterns are flagged and explained
4. Quality criteria are explicit and measurable
5. Retrofit auditing is tractable for existing codebases

---

_Created: 2024-12-31_
