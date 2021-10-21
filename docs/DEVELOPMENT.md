# Development Guide


## Initial Generation
These commands are for documentation and do not need to be repeated

```
mkdir next-app
cd next-app
npx create-next-app@latest .
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


- [Next JS install instructions](https://nextjs.org/docs/getting-started)
- [Tailwind install instructions](https://karmasakshi.medium.com/the-correct-way-of-adding-tailwind-to-your-next-js-app-66b590eef2a2#:~:text=The%20correct%20way%20of%20adding%20Tailwind%20to%20a,are%20also%20added%3B%20e.g.%20purge%3A%20%5B%27.%2Fpages%2F%2A%2A%2F%2A.jsx%27%2C%20%27.%2Fcomponents%2F%2A%2A%2F%2A.jsx%27%20%5D%2C)