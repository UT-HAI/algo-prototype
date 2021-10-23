# Flask React Boilerplate

[![Build Status](https://travis-ci.org/YaleDHLab/flask-react-boilerplate.svg?branch=master)](https://travis-ci.org/YaleDHLab/flask-react-boilerplate)

Simple boilerplate for a Flask backend and React client including:

* ES6 transpiling via Webpack
* Hot module reloading via Webpack Dev Server
* State management via Redux
* Tests via Pytest and Jest
* Linting via Pylint and Eslint
* Travis CI for automatic testing and linting

## Getting Started

To install dependencies:

```bash
yarn install
pip install -r requirements.txt
```

## Development

Start the frontend development server with hot-reloading:

```bash
yarn start
```

Start the Flask server (the webpack dev server will proxy requests starting with /api to Flask):

```bash
yarn serve
```

## Production

Build the frontend:

```bash
yarn build
```

Serve the frontend + the API:

``bash
yarn serve
```

Deploy the most recent git commit:

```bash
heroku login
heroku git:remote -a algo-deliberation
git push heroku main
```

Only need to do the first two lines once to initially connect to the repo.

## Linting

To lint the Javascript files (located in `src`), run:

```bash
npm run lint-js
```

To lint the Python files (located in `server`), run:

```bash
npm run lint-py
```