# Apollo Countries

An app that can fetch some country data from a GraphQL server. This builds a
GraphQL client from the ground-up with reuse and flexibility in mind.

## Getting started

After cloning the repo, install dependencies with `npm`:

```sh
npm install
```

Start the app:

```
npm start
```

## Browsing code

Here are some areas of interest when browsing the code. Throughout the code
you'll also find some code comments that help explain my thinking in how I
designed the implementation of this task.

**`src/index.tsx`**

This root file is a great starting point when digging into the source code for
this application. It is here I initialize the GraphQL client for the application
and the main UI for the application.

**`src/App.tsx`**

This provides some high-level UI for the app, such as the header and main areas
of the application. This component also renders the `Countries` component which
fetches the countries data from the server and renders them in a list.

**`src/components/Countries.tsx`**

This is the main area of interest for the task. This is where I execute the
GraphQL query to get the countries data and display it in a list.

**`src/hooks/useQuery.ts`**

This hooks provides the ability to execute a GraphQL query against the GraphQL
server. It uses the GraphQL client initialized in `src/index.tsx` to fetch data.
This hook is designed to be generic and used with any GraphQL query. It uses
TypeScript generics to provide a nice developer experience to type the data
returned from the query.

**`src/createGraphQLClient.ts`**

This creates a generic GraphQL client that can talk to any GraphQL server. While
this task was designed to talk to a single server, I wanted something generic
that is easy to configure, decoupled from React, and conformed to a specific
interface.

While not part of the task, this design allows you to more easily provide a mock
implementation of a GraphQL client that could be used in tests.

### Design

The implementation is heavily inspired by Apollo client with a sprinkle from
[React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/).
I really liked the `status` returned in React Query as part of state when
fetching data, so I opted for this approach over a `loading` flag.

While I could have implemented this task inside the `useQuery` hook exclusively,
I wanted to show how we could use composition and a decoupled approach to allow
for maximum flexibility.

- By separating out the creation of the client from React, we can
  easily spin up multiple GraphQL clients that fetch against a different servers.
- The `useGraphQLClient` hook provides an escape-hatch to developers that may
  need to use the client directly, and bypass the `useQuery` hook.
- The `useQuery` hook provides the convenience and lifecycle management for
  executing a GraphQL query. Its expected this is used the most.
