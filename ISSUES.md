## Purpose of This File

- when developing apps, it's common to encounter certain difficulties that have to be overcome
- this can be time consuming/frustrating
- for each project, I will record issues encountered and how to overcome

### 1 - Styled components, createGlobalStyle and Google Fonts

- fonts you set won't take effect unless you put them in `:root`, `#root`, `html`, or `*`, etc, like so:

```js
const GlobalStyle = createGlobalStyle`
:root{
font-family: "Libre Franklin", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;

}
`;
```

- may seem obvious but when also using something like `styled-reset` you may start down the path of "`styled-reset` must be causing my fonts to not work"
