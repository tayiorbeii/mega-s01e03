# GitHub ticket workflow

Use this runbook before creating, editing or closing GitHub issues. It is a manual,
reviewed routine, not an auto-running script. Run commands from the intended checkout.

## 1. Confirm scope, approval and access

- Read the task and current course/project instructions, including any issued proofs.
- Ask which account/repo to use and whether publication is approved. Say that anyone
  can see a public repo. Approval to work locally does not authorize remote changes.
- Get approval for the intended issue creations, edits or closures. Keep later changes
  inside that approved scope; ask again if the scope changes.
- Never create accounts, install software or spend money without the required approval.
- Check the installed CLI contracts before using unfamiliar commands:

```sh
gh auth status
gh repo create --help
gh issue create --help
gh issue edit --help
gh issue close --help
git status --short
git remote -v
```

Do not copy credentials into drafts, logs or commits. Keep private course receipts and
browser state outside published repos. A course-issued page signature is public only
when its contract explicitly requires publication; it is not a browser login credential.

## 2. Draft one problem per issue, with sources

Save the body locally, for example in `issues/problem.md`, before sending it:

- **Problem:** one observed failure, its scope, expected result and actual result.
- **Reports:** count, snapshot date, deduplication key and the exact view used to count.
- **Evidence:** report IDs, source paths and a reproducible example. Separate a confirmed
  mechanism from a hypothesis. Link related work instead of describing several problems.
- **Verification:** bounded acceptance checks and what has actually been tested.
- **Status:** open, fixed or not planned, with the source of that status.

Use the authoritative counting definition. Remove repeated export rows by ID, but do not
invent a requirement that different ticket views be disjoint. If a symptom list overlaps
a cause count, state the overlap and count unique IDs separately for the overall total.

For a rendered knowledge base, build and inspect the actual page, not just its source or
an alternate calculation. Preserve accepted decision records; add a superseding record.

## 3. Inspect existing state before any write

Set explicit values only after the target and operation have been approved. Empty values
below deliberately stop commands; replace them with the approved repo and reviewed draft.

```sh
REPO=''          # Approved owner/name, never inferred from the current directory.
TITLE=''         # One problem and its report count, if the task asks for one.
BODY_FILE=''     # Path to the reviewed Markdown draft.
ISSUE=''         # Existing issue number; record the real number after creation.

gh repo view "${REPO:?Set the approved owner/name}" --json nameWithOwner,visibility,url
gh issue list --repo "${REPO:?Set the approved owner/name}" --state all
```

If the repo does not exist, distinguish not-found from an authentication or network error.
Only after approval to create it, and after checking that `origin` is not already in use:

```sh
gh repo create "${REPO:?Set the approved owner/name}" --public --source=. --remote=origin
```

This command does not push commits. Inspect and commit only task changes using the normal
hooks and relevant checks. In a shared checkout, let the integration owner commit. Push
only with publication approval; never stage everything blindly, open an unauthorized PR
or merge a PR. Keep unrelated work and private/generated runtime files out of the commit.

## 4. Create or edit, then read back

Create only after checking that the issue is not already present:

```sh
gh issue create --repo "${REPO:?Set the approved owner/name}" \
  --title "${TITLE:?Set the reviewed title}" \
  --body-file "${BODY_FILE:?Set the reviewed draft path}"
```

Record the returned URL and number; never predict issue numbers in published links.
For an approved revision, inspect the issue first, edit the local draft, then update it:

```sh
gh issue view "${ISSUE:?Set the issue number}" --repo "${REPO:?Set the approved owner/name}"
gh issue edit "${ISSUE:?Set the issue number}" --repo "${REPO:?Set the approved owner/name}" \
  --title "${TITLE:?Set the reviewed title}" \
  --body-file "${BODY_FILE:?Set the reviewed draft path}"
gh issue view "${ISSUE:?Set the issue number}" --repo "${REPO:?Set the approved owner/name}" \
  --json number,url,title,body,state,stateReason
```

Check the remote title, body, count and links against the draft. After a timeout or partial
failure, inspect remote state before retrying: the issue or update may already exist.

## 5. Re-fetch evidence, close with the correct reason

Revisit the live course/project source before claiming completion. A parent ticket being
closed does not mean every child problem was fixed. Check each problem's disposition.

Set exactly one supported reason after reviewing the evidence:

- `completed`: the authoritative update says the problem was fixed or work completed.
- `not planned`: won't fix, retired or intentionally declined. Do not call this fixed.
- `duplicate`: only a verified duplicate, with its canonical issue identified.

Leave unresolved investigations open. State whether an outcome is reported by another
team or independently verified by the harness; do not turn a reported fix into a test claim.
For an approved closure, choose the reason and a source-backed comment:

```sh
REASON=''         # completed, not planned, or duplicate; choose from evidence.
CLOSING_COMMENT='' # Outcome, source URL/date, and what was or was not verified.

gh issue close "${ISSUE:?Set the issue number}" --repo "${REPO:?Set the approved owner/name}" \
  --reason "${REASON:?Choose the evidence-backed reason}" \
  --comment "${CLOSING_COMMENT:?Cite the disposition and source}"
gh issue view "${ISSUE:?Set the issue number}" --repo "${REPO:?Set the approved owner/name}" \
  --json number,url,state,stateReason
```

## 6. Validate and hand off

- Rebuild changed rendered artifacts and run the project's relevant checks.
- Inspect the staged diff and create a small local commit; publish only if authorized.
- Verify remote issue state and closure reason, and the published revision if applicable.
- Use the course's declared claim tool and fields. Keep private proofs whole and logs
  masked. A local check or closed ticket is not course acceptance.
- On rejection, compare current evidence with the requirement before editing. Make a
  bounded correction, not speculative regrouping or repeated retries to seek approval.
- Report the repo, issue URLs, commit, checks and unresolved work. Debrief only after
  course acceptance, using its returned questions. Do not rewrite a historical debrief
  to imply that a later workflow improvement existed during the solve.
