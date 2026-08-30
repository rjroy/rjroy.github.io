---
title: "Leveraging Local LLMs: A January 2026 Experiment"
description: "A dated January 2026 local-model experiment: performance observations, hardware failures, and questions that remained open."
date: 2026-01-24
tags:
  - local-models
  - llm
  - experiments
---

# Leveraging Local LLMs: A January 2026 Experiment

This records a local-model experiment conducted in January 2026. The observations and conclusions below describe that test environment and are not current model-selection guidance.

## Context

At the time of testing, the local LLM landscape was shifting. Models like GLM-4.7-Flash (released January 19, 2026) appeared to offer competitive performance with significantly smaller active parameter counts through MoE architecture, making them viable to investigate on consumer hardware.

## Key Discoveries

### GLM-4.7-Flash (Zhipu AI)

**Released**: January 19, 2026
**Architecture**: 30B total parameters, ~3B active per token (MoE)
**Performance**:
- SWE-bench Verified: 59.2% (vs Qwen3-Coder 480B at 55.4%)
- Speed: 43-82 tokens/second on local hardware (M4 Max reports)

**Positioning**: Free-tier model optimized for high-volume endpoints, UI assistants, batch processing. Designed to run locally on consumer hardware.

### Zhipu AI Background

- **Founded**: 2019, spin-off from Tsinghua University's Knowledge Engineering Group
- **Founders**: Professors Tang Jie and Li Juanzi
- **Timeline**:
  - 2021: GLM base model
  - 2022: GLM-130B (bilingual, open-source)
  - March 2023: ChatGLM (ChatGPT competitor)
  - 2026: Recently went public, pushing international markets

**Market position**: Strong in China, less known in Western markets. Academic lineage similar to Anthropic/OpenAI.

## Local Testing

### GLM-4.7-Flash (bf16)

**Hardware**: 96GB GPU RAM
**Memory usage**: 58GB (plenty of headroom)
**Quantization**: bf16
**Performance**: ~6 minutes for simple queries ("what do you think of this project?")

**Conclusion**: bf16 is unusably slow. The reported benchmarks (43-82 tok/s) are likely using quantized versions (int4/int8). Switching to q4_K_M to test speed vs quality tradeoff.

**Learning**: In this test configuration, bf16's observed latency made it unsuitable for the simple queries tried. q4_K_M was selected for a follow-up comparison; its speed and quality tradeoff had not yet been measured.

### System Stability Issues

**Problem**: PC rebooted during testing when switching between models (60GB bf16 → 20GB model).

**Root cause**: Multiple factors compounding:
1. **Model overlap**: Inference server (LM Studio/Ollama) loaded second model without unloading first
   - 58GB (GLM-4.7-Flash bf16) + 20GB (second model) = 78GB total in VRAM
   - Both models active during transition created power draw spike
2. **Faulty KVM**: Dodgy KVM with ground fault (shocks on contact) introducing voltage instability
   - System tolerates issues during idle/light load
   - High GPU power draw (300-400W) during inference exposes power delivery problems
   - Model switching spike exceeds KVM's degraded capacity

**Key insight**: Local inference memory budget ≠ power budget. Having VRAM headroom (78GB/96GB) doesn't prevent issues if power delivery can't sustain the draw. Inference servers often cache multiple models for fast switching without considering cumulative power implications.

**Workarounds**:
- Replace faulty KVM (immediate priority)
- Manually unload models between tests
- Configure inference server for single model at a time
- Restart inference server between model switches

## Questions to Explore

- What does local inference mean for team AI adoption timelines?
- Cost model comparison: local vs cloud APIs at scale
- How does this affect model selection guidance for the team?
- What workflows benefit from local models vs cloud?
- Privacy/security implications for enterprise use
- Quantization sweet spot: where does quality drop become noticeable?

## Sources

- [Meet Z.AI 4.7 Flash, a Low-Cost Local AI Model for Coding & Smart Tasks](https://www.geeky-gadgets.com/glm-4-7-flash-ai-coding-benchmarks/)
- [Zhipu AI Releases GLM-4.7-Flash: A 30B-A3B MoE Model](https://www.marktechpost.com/2026/01/20/zhipu-ai-releases-glm-4-7-flash-a-30b-a3b-moe-model-for-efficient-local-coding-and-agents/)
- [Z.ai - Wikipedia](https://en.wikipedia.org/wiki/Z.ai)
- [Zhipu AI: The Academic Vanguard](https://markets.financialcontent.com/wral/article/predictstreet-2025-12-31-zhipu-ai-the-academic-vanguard-defining-chinas-generative-future)
- [Zhipu AI Company History](https://canvasbusinessmodel.com/blogs/brief-history/zhipu-ai-brief-history)
