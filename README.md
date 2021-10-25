# Algorithm Deliberation Prototype

MVP version of a collaborative, machine learning deliberation tool

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

The Heroku app has Python and Node buildpacks that will automatically install dependencies and run the build command. The Procfile specifies a command for Heroku to call that will start a gunicorn server.

## Linting

To lint the Javascript files (located in `src`), run:

```bash
npm run lint-js
```

To lint the Python files (located in `server`), run:

```bash
npm run lint-py
```