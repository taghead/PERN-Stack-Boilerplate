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

### Initializing Next and React with typescript.

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


### Cleanup generated files
#### Removing generated example components, routes and page files.
Remove the following files and folders
- [/components/Layout.tsx](/components/Layout.tsx)
- [/components/List.tsx](/components/List.tsx)
- [/components/ListDetail.tsx](/components/ListDetail.tsx)
- [/components/ListItem.tsx](/components/Layout.tsx)
- [/pages/about.tsx](/pages/about.tsx)
- [/pages/index.tsx](/pages/index.tsx)
- [/pages/users](/pages/users)
- [/pages/api/users](/pages/api/users)

#### Removing generated example interface code.

Remove or comment out the content of these files
- [/interfaces/index.ts](/interfaces/index.ts)

#### Create a basic index page

Create [/pages/index.tsx](/pages/index.tsx) with the following

```typescript
const IndexPage = () => (
  <h1>This content is loaded from the file /pages/index</h1>
)

export default IndexPage
```

### Persistence between pages

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
      This message and the component below is loaded from the index file /components/Layout/index
      <Header />
      This message and the page below is loaded from the index file /components/Layout/index
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

### Skeleton Data modelling

Lets begin by hardcoding some data which will later be replaced with data fetched from a GraphQL API later.

Lets start with some data for items.

Create [/data/items.ts](/data/items.ts) with the following

```typescript
export const items = [
    {
      category: "Poultry",
      description: "Garlic butter loaded crumbed chicken",
      id: "d3123da-123da21-123adqa2w",
      imageUrl: "",
      title: "Chicken Kiev",
      url: ""
    },
    {
      category: "Sweets",
      description: "Cake infused with Green Tea",
      id: "d213-adawsd-12323-asdq",
      imageUrl: "",
      title: "Green Tea Cake",
      url: ""
    }
  ];
```

Now lets make a component to renders those items into a list.

Create [/components/ItemsList.tsx](/components/ItemsList.tsx) with the following
```typescript
import React from 'react';
import { items } from '../data/items';

export const ItemsList = () => {
  return (
    <div className="container mx-auto">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.id} className="shadow rounded">
          <img className="shadow-sm" src={item.imageUrl} />
          <div>
            <p className="text-sm text-blue-400">{item.category}</p>
            <p className="text-lg">{item.title}</p>
            <p className="text-gray-500">{item.description}</p>
            <a href={item.url} className="flex hover:text-blue-600">
              {item.url.replace(/(^\w+:|^)\/\//, '')}
              Link
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};
```

Update [/pages/index.tsx](/pages/index.tsx) and add the ItemsList component by importing, encapsulating then appending the ItemsList element after H1.
```typescript
import { ItemsList } from '../components/ItemsList';

const IndexPage = () => (
  <div>
    <h1>This content is loaded from the file /pages/index</h1>
    <ItemsList></ItemsList>
  </div>
  
)

export default IndexPage
```

### Installing and Initialize Prisma
```bash
npm install --save-dev prisma @babel/core @prisma/client
npx prisma init
```

Since we generated a next project, prisma will refuse to change the ignored files. To merge it we will manually overwrite the [/.gitignore](/.gitignore] with the following content.
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
!.vscode/launch.json.default
*.tsbuildinfo
*tmp.db
.eslintcache
.pnpm-store
.pnpm-store/
.vscode
libquery_engine*

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
yarn-error.log
pnpm-debug.log

# local env files
.env*
.env.local
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# prisma
.prisma
build
coverage
dist
dist/
query-engine*
sandbox
tmp
```

By initializing the prisma project a folder [/prisma/](/prisma/) was created with a [/prisma/schema.prisma](/prisma/schema.prisma) file within it.

For our project the file should be set to use `prisma-client-js` and the database should also be set to `postgresql`.

```typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Notice that the datasource asks for a database connection URL. The variables will be read from [/.env](/.env).

For the development environment lets use the example variables in [/docs/ENVIRONMENT.md](/docs/ENVIRONMENT.md).

|Environment Variable|Description|Values|Default Value|Example|Required?|
|----|----|----|----|----|----|
| DATABASE_URL | Points to Prisma database | URL | null | `postgresql://superawesomeuser:supersecretpass@localhost:5432/superawesomename?schema=public` | yes

Lets alter our [/.env](/.env) file, and add the following line 
```
DATABASE_URL="postgresql://superawesomeuser:supersecretpass@localhost:5432/superawesomename?schema=public"
```

Now it is time to start thinking about our database, lets assume that we have users that want to favorite items. We have two entities to define, Users and Items.

Lets append a simple schema to our [/prisma/schema.prisma](/prisma/schema.prisma) file.
```typescript
model User {
  id            String    @id @default(uuid())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  email         String    @unique
  role          Role      @default(USER)
  favorites     Item[]
}

model Item {
  id String     @id       @default(uuid())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  category      String
  description   String
  imageUrl      String?
  title         String
  url           String?
  users         User[]
}

enum Role {
  ADMIN
  USER
}
```

Additioanly we will create [/prisma/seed.ts](/prisma/seed.ts) in order to populate the database with mock data.

Create [/prisma/seed.ts](/prisma/seed.ts) with the following code
```typescript
import { PrismaClient } from '@prisma/client'
import { data } from '../data/items'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'user@email.com',
      role: 'ADMIN'
    }
  })

  await prisma.item.createMany({data: data})
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### Appropriate Prisma and Next

Next defaults to using ESNext modules. To enable correct seeding behaviour for prisma we must use ts-node.

```bash
npm install --save-dev ts-node
```

Now lets add the following to [/package.json](/package.json)

```json
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
 }
```

### Setting up a development database.

There a multiple ways of setting up a database for development, and you may use what you prefer however I suggest using docker-compose and make.

Lets begin by making [/docker-compose.yml](/docker-compose.yml)

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
    ports: 
      - "5432:5432/tcp"
      - "5432:5432/udp"
```

Notice that we use environment variables in the docker compose file, again lets use the example variables in [/docs/ENVIRONMENT.md](/docs/ENVIRONMENT.md).

|Environment Variable|Description|Values|Default Value|Example|Required?|
|----|----|----|----|----|----|
| DATABASE_NAME | Default database name ( db service ) | STRING | null | `superawesomename` | yes
| DATABASE_SUPERUSER_USER | Declares superusers name | STRING | null | `superawesomeuser` | yes
| DATABASE_SUPERUSER_PASSWORD | Declares superusers password | STRING | null | `supersecretpass` | yes

Lets alter our [/.env](/.env) file, and add the following line 
```
DATABASE_NAME="superawesomename"
DATABASE_SUPERUSER_USER="superawesomeuser"
DATABASE_SUPERUSER_PASSWORD="supersecretpass"
```



Next lets create the [/makefile](/makefile) to automate the process of standing and downing the database.

```yml
all:
	timeout 0

docker-up:
	docker-compose up -d
	timeout 4
	npx prisma migrate dev
	npx prisma db seed

docker-down:
	docker-compose down
```

### Migration and pushing database changes

Lets run that makefile we made earlier. 
```
make docker-up
```

Running it will basically do the following commands:

-	`docker-compose up -d`
-	`npx prisma migrate dev`
-	`npx prisma db seed`


### Exploring the database

Prisma provides a way to preview the database in a web gui. To access the the gui run

```
npx prisma studio
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
- [Codebase reference](https://github.com/m-abdelwahab)
- [PERN Stack Guide](https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-oklidw1rhw)
- [Fixing Seeding Issue](https://www.prisma.io/docs/guides/database/seed-database)