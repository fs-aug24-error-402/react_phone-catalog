# Project Title
React Phone Catalog

## Description
A site designed to sell phones. The site has common features such as:
- Filtering and the ability to share them via URL.
- A list of favorites.
- A cart.
- The possibility to order with Nova Post delivery.

## Installation
1. Clone this repo
2. Run ```npm i```

## Usage
- To start the project run `npm start`
- To check and fix some errors `npm run lint`
- To check and fix code style `npm run format`
- To run localhost properly add `#/` after `http://localhost:5173/react_phone-catalog/`

## Styling
### Basics
- use [Tailwind](https://tailwindcss.com/docs/installation) classes to style one element
- if element can be reused create `<Name>.module.scss` file and use it as [Module Stylesheet](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
- don't forget about [BEM rools](https://en.bem.info/methodology/key-concepts/)

### How to use Tailwind theme variables
In `tailwind.config.js` you can see what values exist and add some if you need.

#### Spacing
These values are for `padding`, `margin`, `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`, `gap`, `inset`, `space`, `translate`, `scrollMargin`, and `scrollPadding`.

Inline styles:
```tsx
<div className={'p-18'}></div>
```
In `scss` file:
```scss
div {
  padding: theme('spacing.18')
}
```
Result:
```css
div {
  padding: 18px;
}
```

#### Colors
You can use them for text color, border color, backgroud color and so on.

Inline styles:
```tsx
<p className={'text-secondary-accent'}></p>
```
In `scss` file:
```scss
p {
  color: theme('colors.secondary.accent')
}
```
Result:
```css
p {
  color: #F4BA47;
}
```

#### Border radius
For inline styles write class `rounded-sm` (8px) or `rounded-lg` (48px).

#### Fonts
Styles for `h1`, `h2`, `h3` and `h4` are already implemented.
`Body text` properties (see in Figma) are using by default.
`Small text`, `Buttons` and `Uppercase` properties are includes in theme.

Inline styles:
```tsx
<p className={'text-small'}></p>
```
Result:
```css
p {
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0;
  font-weight: 600;
}
```

### **_Before each push and pull your code will be checked by_ `Lint` _and_ `Prettier`.**
### **_Also there is a remote_ `Lint` _test_**



### [Link To Page On GH Pages](https://fs-aug24-error-402.github.io/react_phone-catalog/)
