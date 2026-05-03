---
title: Month 11 — AI — GenAI & LLMs
status: stub
---

# Month 11 — AI — GenAI & LLMs

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

The half of the AI pillar that did not exist as a discipline five years ago. By the end of this month you can use generative AI tools fluently in your analytical workflow, write effective prompts for repeatable tasks, evaluate AI output critically, and understand the basic mechanics behind LLMs and retrieval-augmented generation (RAG) — enough to make architectural decisions without being a passenger.

The framing is **AI for analysts**, not *AI for ML engineers*. You will not be fine-tuning a base model. You will be using GitHub Copilot, ChatGPT, Claude, Power BI Q&A and Copilot, and the OpenAI / Anthropic / Azure AI APIs to multiply your own analytical productivity.

## Weekly plan

| Week  | Topic                                            | Outcome                                                              |
|-------|--------------------------------------------------|----------------------------------------------------------------------|
| 41    | LLM intuition & prompt engineering               | What an LLM actually is; tokens, context windows, temperature; the patterns of an effective prompt. |
| 42    | AI in analytics workflows                        | Copilot in Power BI / Excel / Fabric; ChatGPT / Claude for SQL & DAX; honest evaluation of output. |
| 43    | RAG, embeddings, vector databases                | Why RAG exists; build a tiny RAG over your own documents; recognise when RAG is the wrong tool. |
| 44    | AI-assisted coding & analysis                    | GitHub Copilot, Cursor, Claude Code; reviewing AI-generated SQL and Python critically. |

## Prerequisites

- [Month 10 — AI — Classical ML](../month-10-classical-ml/index.md) — the train/test/validate intuition transfers to evaluating LLM outputs.
- [Month 5 — Python Fundamentals](../month-05-python-fundamentals/index.md) — RAG examples will use Python.

## Mini-project

Two-part. **Part A:** build a small RAG (retrieval-augmented generation) over a folder of your own notes or PDFs. Use any free-tier LLM API (OpenAI, Anthropic, Azure AI, Mistral). Constraint: it should answer with citations to the source document. **Part B:** write a 1-page critical review of one Copilot-or-ChatGPT-generated DAX measure and one Copilot-or-ChatGPT-generated SQL query — what it got right, what it got subtly wrong, what you had to fix.

The point is to graduate from *uncritical AI use* to *deliberate AI use*.
