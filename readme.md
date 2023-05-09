# Template-telegram-bot

All of the code is written in typescript which is similar to javascript but is type safe. Watch this [Youtube Crash Course](https://www.youtube.com/watch?v=rAy_3SIqT-E) if you are not familiar.

HMU if you need something similar but hosted on [Heroku & uses PostgreSQL](https://github.com/francisyzy/telegraf-PostgreSQL-template), its unfortunately a private repo that I cannot public due to forking

## Getting started with template

Click [use this template](https://github.com/francisyzy/telegraf-lambda-mysql-template/generate) to create a new Repo for your new telegram bot. _[Find out more on template repos](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template)_

### Setup environment

See [`.env.example`](.env.example) for example on how to set up your `.env` file. _Remember to not commit `.env` into version control. [Read more on `.env`](https://12factor.net/config)_

[Set up env variables (secrets) in Github Actions (Production/Deployment)](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

In addition to setting up your .env files into secrets, you will need the following for serverless to deploy successfully

```
AWS_ACCESS_KEY_ID: serverless requires this to deploy
AWS_SECRET_ACCESS_KEY: serverless requires this to deploy
```

#### Nodejs

The main engine the bot runs on is nodeJS. There is a [Youtube Video](https://www.youtube.com/watch?v=zRo2tvQpus8) on how to setup Typescript with Nodejs & Express(not required)

[NodeJS Download](https://nodejs.org/en/download/)

#### Database

As this bot has a database to read and write information into, you need to set up either a local development database or use your production database for your development work. The latter is not recommended in-case you wipe your production database and cause the bot to lose all memory.

[MySQL Download](https://www.mysql.com/downloads/)

### Developing

`npm install` to install the dependencies

`npm run dev` to run the bot in development environment

`npm run migrate` to generate a new database migration based on the current database schema

### Production

We run the bot on a [AWS Lambda](https://aws.amazon.com/lambda/) for ["free"](https://aws.amazon.com/lambda/pricing/?loc=ft#Free_Tier) as it has 1,000,000 monthly request for free.

As serverless deployments can cause database connections to max out, we use [Prisma DataPlatform](https://www.prisma.io/dataplatform) to pool connections to [PlanetScaleDB](https://planetscale.com/), a MySQL Provider which offers [free tier](https://planetscale.com/pricing) database with generous storage.

_Downside of aws will be how the app will go to sleep if nobody is using, takes <10s for a telegram bot to boot up once someone sends a message to the bot, read more on [Cold Starts Here](https://mikhail.io/serverless/coldstarts/aws/)_

`npm run build` to compile the code & build dataproxy prisma

`npm run start` to start the compiled code

This two commands will be ran automatically by [Github Actions](https://docs.github.com/en/actions/learn-github-actions) once there is a `push` or `pull_request` on the master branch

## Resources

Read more on a similar [project/deployment](https://github.com/francisyzy/foray-watch-bot) done with similar architecture on [Medium](http://go.francisyzy.com/foray-watch-bot-medium)

### Telegraf

- [Github Repo](https://github.com/telegraf/telegraf)
- [Getting started](https://github.com/telegraf/telegraf#getting-started)
- [API reference](https://telegraf.js.org/modules.html)
- [Telegram group for Telegraf](https://t.me/TelegrafJSChat)
- [GitHub Discussions](https://github.com/telegraf/telegraf/discussions)
- [Dependent repositories](https://libraries.io/npm/telegraf/dependent_repositories)

### Prisma

- [Github Repo](https://github.com/prisma/prisma)

The fastest way to get started with Prisma is by following the [**Quickstart (5 min)**](https://www.prisma.io/docs/getting-started/quickstart-typescript).

The Quickstart is based on a preconfigured SQLite database. You can also get started with your own database (PostgreSQL and MySQL) by following one of these guides:

- [Add Prisma to an existing project](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-mysql)
- [Setup a new project with Prisma from scratch](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-mysql)

## Built with

Telegraf
Prisma
MySQL

Hosted on AWS Lambda
