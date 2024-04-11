# `@bluwy/cleanup`

WIP. Wrapper CLI using `eslint` and [`eslint-plugin-depend`](https://github.com/es-tooling/eslint-plugin-depend) (among other parsers).

## Usage

```bash
# Lint all files in the current directory
npx @bluwy/cleanup

# Lint all files in the `packages` directory
npx @bluwy/cleanup "./packages/**/*.{js,jsx,ts,tsx}"
```

## Local Development

```bash
# Lint GitHub repos (clones locally) (example: hiesey/stream-http)
bash ./scripts/line-repo.sh hiesey/stream-http
```
