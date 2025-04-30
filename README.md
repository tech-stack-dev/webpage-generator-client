# TSWEB-GENERATOR

Frontend service of the TSWebPageGenerator, responsible for the UI and use of our backend API,
which contains main functionality.
Utilizes pure React@19.1.0 + Vite, RTK for state management, RTK-Query for data fetching.

## Prerequisites

- Make sure that Node.js and PNPM are installed
  - https://nodejs.org/en/download/
  - https://pnpm.io/installation#using-corepack
- Node version >= 20.x (locally latest LTS 22.15.0 was observed to work without any hiccups)

## Dependencies installation

```bash
$ pnpm install
```

## Preparation

- Check .env.local file, which contains placeholders for the actual environment values needed for running an app
  and connection to all related services. After obtaining the needed values for environment variables,
  create a new .env (.gitignored to not accidentally leak keys) file & paste the placeholders with corresponding
  values into it.

## Run the project locally

```bash
# start in watch-mode
$ pnpm run dev
```

## Building and running in production environment:

```bash
# build && then serve from something like Cloudfront or hand-crafted file-server :d
$ pnpm run build
```

## Testing

```bash
# In construction
```
