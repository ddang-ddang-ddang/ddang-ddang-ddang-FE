# GEMINI.md

## Project Overview

This is a web application built with React, TypeScript, and Vite. It appears to be a minimal setup based on the official Vite template. The main application logic is in `src/App.tsx`.

## Design System

### Typography
- Pretendard is loaded globally through `src/styles/fonts.css`.
- Tailwind theme tokens:
  - `text-xs` → 12px
  - `text-2xl` → 24px
  - `text-4xl` → 36px
  - `leading-tight` → 100%
  - `leading-relaxed` → 150%
- Example:
  ```tsx
  <h1 className="text-main text-4xl leading-relaxed font-bold">
    밸런스 재판 시작하기
  </h1>
  ```

### Colors
- Brand palette is available as Tailwind utility classes:
  - `main` `#203C77`
  - `main-bright` `#E8F2FF`
  - `main-medium` `#809AD2`
  - `main-red` `#EB9292`
- Use them via standard Tailwind prefixes, e.g. `bg-main`, `bg-main-bright`, `text-main`, `border-main-medium`, `text-main-red`.
- Existing 화면 스타일은 그대로 유지되고, 필요한 경우에만 위 팔레트를 선택적으로 사용할 수 있습니다.

### Global Styles
- `src/styles/index.css` imports `fonts.css` then defines the Tailwind `@theme` block with the typography and color tokens above.
- The `body` element defaults to Pretendard with relaxed line height while keeping the base text color black.

## Building and Running

### Development

To run the development server:

```bash
npm run dev
```

### Build

To build the project for production:

```bash
npm run build
```

### Lint

To run the linter:

```bash
npm run lint
```

### Preview

To preview the production build:

```bash
npm run preview
```

## Development Conventions

The project uses ESLint for code linting. The configuration is in `eslint.config.js`.

## src Directory Structure
```
src/
├───apis/
├───assets/
├───components/
├───constants/
├───hooks/
├───pages/
├───stores/
├───App.tsx
└───main.tsx
```
