<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Writing rules

**Never use an em dash (—) in anything a person will read.** This is a hard
rule with no exceptions: site copy, metadata and page titles, alt text,
transactional email (both the HTML and the plain-text part), form messages,
and error strings. Restructure the sentence instead, or use a full stop, a
colon, a comma, or parentheses.

It applies to the whole repository, code comments included, so the rule is
never ambiguous. The one exception is the generated block above, between the
`nextjs-agent-rules` markers: it is machine-managed and edits there are
overwritten. En dashes in numeric ranges (`1–3 years`) are fine.

Check before committing:

```bash
grep -rn "—" app/ README.md public/README.md
```
