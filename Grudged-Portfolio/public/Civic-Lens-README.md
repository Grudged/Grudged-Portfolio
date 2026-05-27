# Civic Lens

Plain-English coverage of Clark County, Nevada government meetings — free, no account, every summary linked to the official record.

## What it does

It reads the county's public Legistar meeting record and turns dense agendas into briefs any resident can follow: a plain-English summary of each agenda item, the roll-call votes, topic tags, the location (with a map link), and a live countdown to upcoming meetings. Civic jargon like "use permit" or "variance" gets a hover or tap definition.

## How it's built

**Production runs on Arch Linux, nightly.** `collect.py` pulls meetings, agenda items, and roll-call votes from the Legistar API into SQLite. `summarize_job.py` calls a local Gemma 4 model (MLX, on a Mac over the LAN) to write the plain-English summaries. `export.py` serializes everything to a versioned `data/civic.json`, which is committed and pushed to GitHub.

**Serving runs on Hetzner.** A Dockerized FastAPI app behind Traefik (automatic TLS) pulls the repo every 15 minutes, rebuilds its SQLite from `civic.json`, and serves fully server-rendered pages for search visibility. Producing content where the AI model lives and shipping it through git keeps the public host stateless, cheap, and easy to roll back.

## Design choices

**Deterministic by default.** Topic tags, the civic-term glossary, and location extraction are all rule-based — Gemma is used only for the prose summaries, never to define legal terms or guess a location. Each extractor fails gracefully, simply showing nothing when there is no confident match.

**Honest about AI.** Every page is labeled an AI summary and links to the official agenda and record, so anyone can verify a detail before relying on it.

## Wired into the ecosystem

A Mission Control ops view proxies the live API, the nightly knowledge compiler feeds the summaries into local model training, an integration-health monitor watches uptime, and Umami provides privacy-friendly analytics.

## Stack

FastAPI · Gemma 4 (MLX) · Legistar API · SQLite · server-rendered HTML / SEO · Docker and Traefik on Hetzner · GitHub as the content transport.
