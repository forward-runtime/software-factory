# Explain a result

Use factory-understand to produce a small desktop HTML review plus separately stored quiz material in your evaluation directory. Do not launch services, alter the project, send human review, or claim actual quiz answers.

This is a hypothetical rehearsal, not production evidence. The agreed criterion is: retries with the same operation ID should not add a second entry.

Provided implementation idea: remember completed operation IDs, and on repeat return the prior result. Before: both attempts append. After: the second attempt reuses the first result. Provided synthetic check log: two cases passed (same-ID retry adds once; distinct IDs add twice). This is a fixture log, not a command you ran. Persistence across process restarts is outside this rehearsal and unverified.

The profile uses five change-specific understanding questions before teammate human review. The giver is offline and has not answered any question. The shared feature spec remains authoritative; the review should not become another feature specification.

Prepare useful exploration of the duplicate-retry behavior, relevant evidence and limits, and the next checkpoint.
