# Algorithm Deliberation Prototype

MVP version of a collaborative machine learning deliberation tool

## Getting Started

To install dependencies:

```bash
yarn install
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

If you're getting errors trying to run the pip install, you may need to upgrade packages. The easiest way to do that is `pip install -U -r requirements.txt`. Make sure to `pip freeze > requirements.txt` to update the package file with new versions,  and push those changes.

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

Serve the frontend + the API (locally):

```bash
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

## Managing the Database

There are separate Mongo Atlas databases for development and production. On your local machine, you should have a .env file with a MONGO_URI variable (for the development DB) and a MONGO_URI_PROD variable containing their connection strings.

To perform certain actions on either database, you can use `yarn db` with the following commands:
* `seed`: will add rows to the collection based on a random uniform distribution (use --rows to specify number of rows, default 10)
* `drop`: will delete all rows in the collection
* `copy`: will copy one database to the other (without the `--production` flag this will copy the contents of production to development)

Additional arguments:
* `--collection [col_name]`: will perform the operation on only the specified collection (by default command is run on *all* collections)
* `--production`: will perform the operation on the production database instead of development

Examples:
* `yarn db seed --rows 20 --collection feature_selections`: adds 20 random rows to the development feature_selections collection
* `yarn db drop --production`: drops every collection in the production database
* `yarn db copy`: copies every collection from production to development (does not overwrite existing documents in development)

## Linting

To lint the Javascript files (located in `src`), run:

```bash
npm run lint-js
```

To lint the Python files (located in `server`), run:

```bash
npm run lint-py
```