---
title: React TypeScript CheatSheet
date: 2021-05-15T16:00:00Z
lang: en
duration: 5min
description: Here are a couple examples of some common react/typescript patterns for reference.
icon: bx-bx-atom
---
> _**⚠️ A Living Document - I'll keep adding to it as it comes up!**_
## Functional Components
```ts
type Props = { 
    children?: ReactNode,
    example?: String
}

export const StronglyTypedComponent: FC<Props> = () => { 
    return (
        <p>Strongly typed!</p>
    )
}
```

## Context Hooks

```ts
/** Provider */
export type AccountContextType = {
  account: any;
  setAccount: (Account: any) => void;
}

export const AccountContext = React.createContext<AccountContextType>(
  { 
    account: '', 
    setAccount: account => console.warn('no account provider')
  }
);

export const useCurrentAccount = () => useContext(AccountContext);

/** Consumer */
const { account, setAccount } = useCurrentAccount();

```