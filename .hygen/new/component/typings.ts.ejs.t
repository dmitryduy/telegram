---
to: "<%= isTypings ? `${absPath}/${componentName}.typings.ts` : null %>"
---

export interface I<%= componentName %> {
  prop: string
}