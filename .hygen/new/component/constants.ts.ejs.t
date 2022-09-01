---
to: "<%= isConstant ? `${absPath}/${componentName}.constants.ts` : null %>"
---

export const <%= h.upper(componentName) %> = '';