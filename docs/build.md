# Build

## Prepare the environment

You will need [Node.js](https://nodejs.org/en) and a [Yarn](https://classic.yarnpkg.com/en/docs/getting-started). You can install both from the installers, but at very minimum, you need to get Node and install Yarn from within it.

```sh
npm install --global yarn
```

## Build the `dist/`

After each substantial change to the engine

```sh
yarn install
yarn build
```

After smaller updates, `build` is enough.

```sh
yarn build
```

## Serve pages

After building the `dist/`, it can be served as any static website.
For quick presentation, either Vite (by this time, present in
the project environment) or Python 3 can be used.

Vite is added to the project scripts, so it can be ran within

```sh
yarn preview
```

If Python 3 is available, the `http.server` module could also be used as the alternative to the Vite:

```sh
cd dist
python -m http.server
```
