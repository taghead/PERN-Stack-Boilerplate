# Development Guide


## Initial Generation
These commands are for documentation and do not need to be repeated

### Next and React

```bash
mkdir next-app
cd next-app
npx create-next-app@latest .
```

### Tailwind

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
// Add Tailwind's @apply styles here
@tailwind utilities;
// Add other global styles below
html {
  ...
}
body {
  ...
}
```

#### Tailwind styled-components
```
npm install tailwind.macro@next --save
npm install styled-components --save
```

Create [/babel-plugin-macros.config.js](/babel-plugin-macros.config.js) with the following content
```
module.exports = {
  tailwind: {
    config: './src/tailwind.config.js',
    styled: 'styled-components/macro',
  },
};
```

> Usage Example
> ```
> 
> // pages/test.js
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


## References


- [Next JS install instructions](https://nextjs.org/docs/getting-started)
- [Tailwind install instructions](https://karmasakshi.medium.com/the-correct-way-of-adding-tailwind-to-your-next-js-app-66b590eef2a2#:~:text=The%20correct%20way%20of%20adding%20Tailwind%20to%20a,are%20also%20added%3B%20e.g.%20purge%3A%20%5B%27.%2Fpages%2F%2A%2A%2F%2A.jsx%27%2C%20%27.%2Fcomponents%2F%2A%2A%2F%2A.jsx%27%20%5D%2C)
- [Tailwind Styled Components](https://medium.com/@dana.rocha/setting-up-a-design-system-in-storybook-with-react-styled-components-tailwind-and-typescript-in-697a99680ddf#:~:text=To%20use%20Tailwind%20together%20with%20Styled-Components%2C%20we%20will,initialise%20tailwind.config.js%20with%20the%20command%3A%20npx%20tailwind%20init)