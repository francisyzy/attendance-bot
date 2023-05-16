# Attendance bot

If you have to submit attendance for some time tracking form from work, maybe its the bot for you! 

### Setup environment

See [`.env.example`](.env.example) for example on how to set up your `.env` file. _Remember to not commit `.env` into version control. [Read more on `.env`](https://12factor.net/config)_


#### Nodejs

The main engine the bot runs on is nodeJS. There is a [Youtube Video](https://www.youtube.com/watch?v=zRo2tvQpus8) on how to setup Typescript with Nodejs & Express(not required)

[NodeJS Download](https://nodejs.org/en/download/)

#### Database

As this bot has a database to read and write information into, you need to set up either a local development database or use your production database for your development work. The latter is not recommended in-case you wipe your production database and cause the bot to lose all memory.

But since this bot is a simple bot just for submissions, why not run it on SQLite?

### Developing

`npm install` to install the dependencies

`npm run dev` to run the bot in development environment

`npm run migrate` to generate a new database migration based on the current database schema

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
SQLite

Hosted on my PC at home
