# Development Guide

The required dependencies for this project are:
- [NodeJS](https://nodejs.org/en/blog/release/v12.13.0/) ( initialized with v12.18.3 )
- [Docker](https://docs.docker.com/engine/install/) ( tested with Docker version 20.10.8 )
- [Docker Compose](https://docs.docker.com/compose/install/) ( tested with docker-compose version 1.29.2 )
- Make
  - Make for Mac: 
    - `brew install make` 
  - Make for Linux: 
    - `pacman install make` 
    - `apt-get install make` 
  - Make for Windows: 
    - [GNUWIN32 Installer](http://gnuwin32.sourceforge.net/packages/make.htm) use the Complete package, except sources ( for automation )
    - `chocho install make` refer to [Chocolatey](https://community.chocolatey.org/packages/make)
<!-- - [PostgresSQL](https://www.postgresql.org/download/) ( pgAdmin4 and [Command Line Tools](https://www.postgresql.org/docs/current/app-psql.html) for the bare minimum installation required. ) -->

Install dependencies by running `npm install` 

Run the development server by running `npm run dev`

## Adding a new page
To add an additional page simply create an additional javascript file in [/pages](/pages).

When the file is created consider the name to be the url route.

Lets assume you make the file [pages/example.test.js](pages/example.test.tsx).

> Here is a example of creating a page using tailwind styled components.
> ```javascript
> 
> import React from "react"
> import styled from "styled-components/macro"
> import tw from "tailwind.macro"
> 
> // styles
> const Header = styled.header`
>   ${tw`bg-black min-h-screen flex flex-col items-center justify-center text-xl text-white`};
> `
> 
> const Test = () => (
>   <div css={tw`text-center`}>
>     <Header>
>       <p css={tw`text-blue-300`}>
>         Using <code>Tailwind</code> and <code>styled-components</code> together.
>       </p>
>     </Header>
>   </div>
> )
> 
> export default Test
> ```
>
> After creating the file run `npm run dev` and navigate to http://localhost:3000/example.test



## Initial Generation
These commands are for documentation and do not need to be repeated

### Next and React

Create folder for codebase

```bash
mkdir next-app
cd next-app
```

Generate scaffolding and boilerplate for next and react
```bash
npx create-next-app . --use-npm -e with-typescript
npm install --save-dev typescript@latest
```

### Addding tailwind

```bash
npm install --save-dev tailwindcss@latest postcss@latest autoprefixer@latest 
npx tailwindcss init -p
```

Create [/styles/global.css](/styles/global.css) and add

```css
@tailwind base;
@tailwind components;

@tailwind utilities;
```

#### Removing default components

Remove the following files 
- [/components/Layout.tsx](/components/Layout.tsx)
- [/components/List.tsx](/components/List.tsx)
- [/components/ListDetail.tsx](/components/ListDetail.tsx)
- [/components/ListItem.tsx](/components/Layout.tsx)
- [/pages/about.tsx](/pages/about.tsx)

#### Creating a persistence between pages

Making content persistant between pages removes that hassle of maintaining the multiples of the same elements and imports. Though it is not limited to those situations only.

Create [/pages/_app.tsx](/pages/_app.tsx) with the following
```typescript
/*
  This file persists content across every page.
*/

import '../styles/global.css'
import Layout from '../components/Layout/'
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
```

With this setup any component registered with [/components/Layout/index.tsx](/components/Layout/index.tsx) will be loaded into every page

Create [/components/Layout/index.tsx](/components/Layout/index.tsx) with the following
```typescript
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      This and all content is loaded from the index file /components/Layout/index
      <Header />
      {children}
    </div>
  );
};

export default Layout;
```

Create [/components/Layout/Header.tsx](/components/Layout/Header.tsx) with the following
```typescript
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div>
        <Link href="/">
          <a> This content is loaded from the header file /components/Layout/Header </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
```
<!-- 
### Nexus with Prisma

Install Prisma modules
```bash
npm i --save @prisma/client @nexus/schema nexus-plugin-prisma
npm i --save-dev @prisma
```

Initialize Prisma
```bash
npx prisma init
```

Replace the content of[/.gitignore](/.gitignore) with
```
!.vscode/launch.json.default
*.pem
*.tsbuildinfo
*tmp.db
.DS_Store
.env*
.env.development.local
.env.local
.env.production.local
.env.test.local
.eslintcache
.pnp.js
.pnpm-store
.pnpm-store/
.prisma
.vercel
.vscode
/.next/
/.pnp
/build
/coverage
/node_modules
/out/
/pages/example.test.tsx
build
coverage
dist
dist/
libquery_engine*
node_modules
npm-debug.log*
pnpm-debug.log
query-engine*
sandbox
tmp
yarn-debug.log*
yarn-error.log
yarn-error.log*
```

Set the provider in [/prisma/schema.prisma](/prisma/schema.prisma) it can be either postgresql, mysql, sqlite, sqlserver or mongodb. We will use PostgreSQL. ( May already be done by default. ).

```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
#### Running PostgreSQL in Docker

Create [/docker-compose.yml](/docker-compose.yml) with the following

```yml
version: '3.1'

services:

  db:
    image: postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: "${DATABASE_NAME}"
      POSTGRES_USER: "${DATABASE_SUPERUSER_USER}"
      POSTGRES_PASSWORD: "${DATABASE_SUPERUSER_PASSWORD}"
```

Overwrite [/.env](/.env) with the following
```bash
DATABASE_NAME="superawesomename"
DATABASE_SUPERUSER_USER="superawesomeuser"
DATABASE_SUPERUSER_PASSWORD="supersecretpass"

DATABASE_URL="postgresql://superawesomeuser:supersecretpass@localhost:5432/superawesomename?schema=public"
```

Run `docker-compose up -d`

## Creating an initial schema

Add the following to the bottom of [/prisma/schema.prisma](/prisma/schema.prisma)
```typescript
model User {
  id    String  @default(cuid()) @id
  name  String
}
``` -->
<!-- ```js
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String   @db.VarChar(255)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

enum Role {
  USER
  ADMIN
}
``` -->

<!-- Run `npx prisma migrate dev` to migrate your Prisma schema into postgres; -->

<!-- Run `npx prisma db pull` to turn your database schema into a Prisma schema. -->
<!-- 
Run `npx prisma generate` to generate the Prisma Client. You can then start querying your database.

### Integrating Graphql and Nexus schemas into Next.js

Install modules
```
npm install --save apollo-server-micro@^2 graphql micro nexus
```

Create [/pages/api/graphql.ts](/pages/api/graphql.ts) with the following 
```js
import { ApolloServer } from 'apollo-server-micro';

// we'll create these in a second!
import { schema } from '../../graphql/schema';
import { createContext } from './../../graphql/context';

const apolloServer = new ApolloServer({
  context: createContext,
  schema,
  tracing: process.env.NODE_ENV === 'development'
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({
  path: '/api/graphql'
});
```

Create [/graphql/schema.ts](/graphql/schema.ts) with the following 

```javascript
import { objectType, queryType, mutationType, makeSchema } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';

const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world' });
  }
});

export const schema = makeSchema({
  types: [Query],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql')
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma'
      },
      {
        source: path.join(process.cwd(), 'graphql', 'context.ts'),
        alias: 'Context'
      }
    ]
  }
});
```

Create [/graphql/context.ts](/graphql/context.ts) with the following 

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

export function createContext(): Context {
  return { prisma };
}
```

### Tailwind

Install tailwind modules

```bash
npm install --save tailwindcss@latest postcss@latest autoprefixer@latest 
npx tailwindcss init -p
```

Modify [/tailwind.config.js](/tailwind.config.js) and add
```js
module.exports = {
  purge: ['./pages/**/*.jsx', './components/**/*.jsx', './pages/**/*.tsx', './components/**/*.tsx'],
  ...
} 
```
Modify [/styles/global.css](/styles/global.css) and add
```css
@tailwind base;
@tailwind components;

@tailwind utilities;

html {
  ...
}
body {
  ...
}
```

#### Tailwind styled-components
Install tailwind styled-components modules
```bash
npm install --save tailwind.macro@next styled-components
```

Create [/babel-plugin-macros.config.js](/babel-plugin-macros.config.js) with the following content
```js
module.exports = {
  tailwind: {
    config: './tailwind.config.js',
    styled: 'styled-components/macro',
  },
};
```

Create [/.babelrc](/.babelrc) with the following
```json
{
    "presets": ["next/babel"],
    "plugins": ["macros"]
}
```

Create [/pages/_app.tsx](/pages/_app.tsx) with the following
```javascript
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
``` -->
<!-- 
### Adding Prisma database seeding

Append [/package.json](/package.json) with the following
```json
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
```

Create [/prisma/seed.ts](//prisma/seed.ts) with the following
```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const johndoe = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@jd.com"
    },
  });
  console.log({ johndoe });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
``` -->

## References


- [Next JS install instructions](https://nextjs.org/docs/getting-started)
- [Tailwind install instructions](https://karmasakshi.medium.com/the-correct-way-of-adding-tailwind-to-your-next-js-app-66b590eef2a2#:~:text=The%20correct%20way%20of%20adding%20Tailwind%20to%20a,are%20also%20added%3B%20e.g.%20purge%3A%20%5B%27.%2Fpages%2F%2A%2A%2F%2A.jsx%27%2C%20%27.%2Fcomponents%2F%2A%2A%2F%2A.jsx%27%20%5D%2C)
- [Tailwind Styled Components](https://medium.com/@dana.rocha/setting-up-a-design-system-in-storybook-with-react-styled-components-tailwind-and-typescript-in-697a99680ddf#:~:text=To%20use%20Tailwind%20together%20with%20Styled-Components%2C%20we%20will,initialise%20tailwind.config.js%20with%20the%20command%3A%20npx%20tailwind%20init)
- [Prima Client](https://dev.to/aryanjnyc/introduction-to-prisma-with-next-js-1l0#:~:text=%20Introduction%20to%20Prisma%20with%20Next.js%20%201,a%20Data%20Model.%20For%20simplicity%27s%20sake...%20More%20)
- [Prisma - Getting Started](https://pris.ly/d/getting-started)
- [Prisma - Schemas](https://www.prisma.io/docs/concepts/components/prisma-schema#using-environment-variables)
- [Prisma - Connection URLs Options](https://pris.ly/d/connection-strings)
- [Prisma - Api](https://www.section.io/engineering-education/api-with-prisma-and-nodejs/#:~:text=%20Prerequisites%20%201%20Step%201%3A%20Setting%20up,Step%205%3A%20Creating%20a%20Rest%20API%20More%20)
- [PostgreSQL - Dockerhub](https://hub.docker.com/_/postgres/)
- [Fullstack (Next, Nexus, Primsa, GraphQL) setup guide](https://github.com/hexrcs/fullstack-graphql-next-nexus-prisma)