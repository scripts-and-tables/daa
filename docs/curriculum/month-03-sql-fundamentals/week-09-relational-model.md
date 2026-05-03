---
title: Week 9 — Relational model, keys, normalisation
tags:
  - level::beginner
  - tool::sql
  - type::theory
time_estimate: 6h
status: complete
---

# Week 9 — Relational model, keys, normalisation

> The mental model that makes everything else in SQL make sense. Tables, rows, columns, primary keys, foreign keys, and the small amount of normalisation theory you need to read an ER diagram without confusion. No queries this week — that's [Week 10](week-10-select-where-groupby.md).

## Learning objectives

- [ ] Define *table*, *row*, *column*, *primary key*, *foreign key*, *referential integrity* in your own words.
- [ ] Read an ER (entity-relationship) diagram and identify entities, attributes, and the cardinality of each relationship (1-to-1, 1-to-many, many-to-many).
- [ ] Explain *first*, *second*, and *third normal form* (1NF / 2NF / 3NF) using one concrete example each.
- [ ] Recognise when a schema is *under-normalised* (a "spreadsheet in a database") and the analytical problems that causes.
- [ ] Distinguish OLTP-style normalised schemas from OLAP-style denormalised schemas (full treatment in [Month 4, Week 16](../month-04-sql-advanced/index.md)).

## Prerequisites

- [Month 2 — Spreadsheets](../month-02-spreadsheets/index.md). The mental model of a Table with structured references (Week 5) is exactly the relational model with extra rules.

## Time estimate

Total: ~6h  (Reading: 2h · Video: 2h · Hands-on: 2h)

## Curated resources

### Courses

- [Microsoft Learn — *Get started querying with Transact-SQL* (Module 1: Introduction)](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/) — *free* · ~30 min · **Why:** the canonical Microsoft entry point; sets up the T-SQL vocabulary you will use across [Months 3–4](../month-04-sql-advanced/index.md).
- [Stanford Online — *Databases: Relational Databases and SQL*](https://www.edx.org/learn/relational-databases/stanford-university-databases-relational-databases-and-sql) — *audit free* · skim the *Relational Model* and *Relational Algebra* lectures only this week (~3h) · **Why:** Jennifer Widom's lectures are the gold standard for the underlying *theory*. The full course is overkill for an analyst; the relational-model chapter is the part worth seeing.

### Microsoft Learn / official docs

- [Database design basics — Microsoft Support](https://support.microsoft.com/en-us/office/database-design-basics-eb2159cf-1e30-401a-8084-bd4f9c9ca1f5) — **Why:** the friendliest "what is a primary key, what is a foreign key" reference Microsoft has published. Written for Access but the ideas are universal.
- [Logical database design — SQL Server docs](https://learn.microsoft.com/en-us/sql/relational-databases/databases/database-engine-instances-sql-server) — **Why:** SQL Server's view of design and the place to find the canonical T-SQL terminology you will see on PL-300 / DP-203.

### Videos

- [*The Relational Database Model* — Caleb Curry](https://www.youtube.com/watch?v=NvrpuBAMddw) — ~14 min · **Why:** the cleanest 14-minute introduction to keys, relationships, and cardinality on YouTube.
- [*Database Normalization — 1NF, 2NF, 3NF*](https://www.youtube.com/watch?v=GFQaEYEc8_8) — Decomplexify · ~20 min · **Why:** the rare normalisation video that doesn't drown you in formal definitions; one running example, three normal forms, every "why" explained.
- [*Entity-Relationship Diagrams Explained*](https://www.youtube.com/watch?v=QpdhBUYk7Kk) — Lucid Software · ~9 min · **Why:** ER notation varies between Chen, crow's foot, and UML styles; this video shows you all three so you can read whatever your colleague drew on the whiteboard.

### Books / long-form reading

- *SQL for Data Analysis* — Cathy Tanimura. Read **chapter 1** ("Analysis with SQL") this week. **Why:** the introduction sets up the analyst's view of the relational model — pragmatic, with the gotchas that cookbook authors usually leave out. The full book lands in [Weeks 10–12](week-10-select-where-groupby.md) and again in [Month 4](../month-04-sql-advanced/index.md).
- *Database Design for Mere Mortals* — Michael J. Hernandez. Skim chapters 1–4. **Why:** the most readable introduction to relational design in print. Old, still excellent.

### Certifications (if relevant)

- **PL-300** — *Prepare the data* expects you to recognise relationships and cardinality when you import multiple tables into Power BI. The Power BI model tab is the relational model with extra UI.
- **DP-203 / DP-700** — *Design and implement storage* presumes the same vocabulary.

## Practice

- **Read an ER diagram.** Open the [AdventureWorks ER diagram](https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure) (or any sample-database diagram). For each table, identify: the primary key, the foreign keys, and the cardinality of each relationship to a neighbour. There are no queries — just *read* the schema.
- **Spot the normalisation problem.** Take a flat spreadsheet you have lying around (orders with customer name and address repeated on every row, for instance). Sketch it as it stands and then sketch it as a 3NF schema with separate `Customers`, `Orders`, and `OrderLines` tables. List two analytical questions that would now be easier and one that would now be harder.
- **Cardinality drill.** For each pair below, decide whether the relationship is 1-to-1, 1-to-many, or many-to-many: *Customer ↔ Order* · *Order ↔ Product* · *Employee ↔ Department* · *User ↔ Role*. For the many-to-many ones, what *junction table* would you add?
- **Draw it.** Pick a domain you know — books and authors, podcasts and episodes, students and courses. Draw the schema (paper or [dbdiagram.io](https://dbdiagram.io/)). Argue with yourself about every foreign key.
- **Self-check questions.**
    1. Why does a primary key have to be both *unique* and *not null*?
    2. A column violates 1NF — what does that mean concretely? Give an example.
    3. Why is a many-to-many relationship usually represented with a third table?
    4. Why are operational (OLTP) schemas typically more normalised than analytical (OLAP) schemas? (Foreshadows [Month 4, Week 16](../month-04-sql-advanced/index.md).)

## My notes

The single most useful sentence about normalisation is **"each fact lives in exactly one place"**. If a customer's address is on every order row, you have to update twenty rows when they move house — and the moment one of those updates fails, the database disagrees with itself. Normalisation is the discipline of designing schemas where that *cannot* happen.

The opposite of that — deliberate duplication for query speed — is **denormalisation**, and is what analytical warehouses do on purpose. You will design denormalised star schemas in [Month 4, Week 16](../month-04-sql-advanced/index.md). The reason normalisation comes first is that you cannot defensibly denormalise something you don't first understand normalised.

Most beginners over-rotate on normalisation theory. You do not need 4NF, 5NF, or BCNF to be a competent analyst. 1NF, 2NF, and 3NF — and the sentence above — are the working set.

ER diagrams use three notation styles in the wild. Chen notation (diamonds for relationships) is the textbook style. Crow's foot is what most modern tools draw. UML class diagrams are what software engineers default to. They all encode the same information; learn to read all three superficially.

## Further / optional

- *An Introduction to Database Systems* — C. J. Date. The canonical academic textbook. Heavy. Skip unless you intend to design databases for a living.
- [dbdiagram.io](https://dbdiagram.io/) — free in-browser ER diagramming tool with a small DSL. Useful for sketching.

## Next

→ [Week 10 — `SELECT` / `WHERE` / `GROUP BY`](week-10-select-where-groupby.md)
