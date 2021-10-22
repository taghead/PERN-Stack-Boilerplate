# Development Guide

Install dependencies by running `npm install` 

Run the development server by running `npm run dev`

## Adding a new page
To add an additional page simply create an additional javascript file in [/pages](/pages).

When the file is created consider the name to be the url route.

Lets assume you make the file [pages/example.test.js](pages/example.test.js).

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
npx create-next-app@latest .
```

### Tailwind

Install tailwind modules

```bash
npm install tailwindcss@latest postcss@latest autoprefixer@latest --save
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
npm install tailwind.macro@next --save
npm install styled-components --save
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

### Prisma

Install Prisma modules
```bash
npm install @prisma/client
npm install @prisma/cli --save-dev
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
/pages/example.test.js
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


## References


- [Next JS install instructions](https://nextjs.org/docs/getting-started)
- [Tailwind install instructions](https://karmasakshi.medium.com/the-correct-way-of-adding-tailwind-to-your-next-js-app-66b590eef2a2#:~:text=The%20correct%20way%20of%20adding%20Tailwind%20to%20a,are%20also%20added%3B%20e.g.%20purge%3A%20%5B%27.%2Fpages%2F%2A%2A%2F%2A.jsx%27%2C%20%27.%2Fcomponents%2F%2A%2A%2F%2A.jsx%27%20%5D%2C)
- [Tailwind Styled Components](https://medium.com/@dana.rocha/setting-up-a-design-system-in-storybook-with-react-styled-components-tailwind-and-typescript-in-697a99680ddf#:~:text=To%20use%20Tailwind%20together%20with%20Styled-Components%2C%20we%20will,initialise%20tailwind.config.js%20with%20the%20command%3A%20npx%20tailwind%20init)
- [Prima Client](https://dev.to/aryanjnyc/introduction-to-prisma-with-next-js-1l0#:~:text=%20Introduction%20to%20Prisma%20with%20Next.js%20%201,a%20Data%20Model.%20For%20simplicity%27s%20sake...%20More%20)
- [Prisma - Getting Started](https://pris.ly/d/getting-started)