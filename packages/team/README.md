# juiz-team package

# How to

```typescript
import { AccountRepository } from "@teitei-tk/juiz-team/repositories/account";

(async() => {
  const account = await AccountRepository.find_by_github_name("teitei-tk");
  console.log(account.toJSON());

  /**
    * {
    *   id: 'a70db95d-1d8e-4cd9-ad25-0b2f10babd20',
    *   name: 'teitei-tk',
    *   displayName: 'teitei-tk',
    *   serviceAccounts: [
    *     {
    *       id: '1032869f-8967-4209-bcc3-9daf234e8328',
    *       name: 'teitei-tk',
    *       displayName: 'teitei-tk',
    *       service: 0
    *     },
    *     {
    *       id: 'a193784a-6511-4e64-bd7e-25b02bdbc671',
    *       name: 'teitei_tk',
    *       displayName: 'john teitei_tk doe',
    *       service: 1
    *     }
    *   ]
    * }
    *
   **/
})

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
