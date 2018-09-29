# juiz-team package

# How to

```typescript
import { UserRepository } from "@teitei-tk/juiz-team/repositories";

const accounts = UserRepository.find_by_github_name(
  "teitei-tk"
).to_accounts.map(account => {
  return {
    service: account.service_name,
    account.service_name: account.name
  }
});

console.log(accounts);
/*
 * eg.
 * [
 *    {
 *      service: "github",
 *      github: "teitei-tk"
 *    },
 *    {
 *      service: "slack",
 *      slack: "teitei_tk"
 *    }
 * ]
 */
```
