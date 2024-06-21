# Discord Bot Template

The only right way to start a new Discord bot project. This template comes with nice way commands are structured (type safe). It also comes with event handler (type safe). Everything is type safe and easy to use.

This template will be updated with new features and improvements. If you have any suggestions or improvements, feel free to open an issue or a pull request.

## Features

- Prisma ORM
- Command Handler
- Event Handler
- Type Safe
- Docker Support
- Cooldowns
- Redis Cache
- Build-in Sharding Support (when you need it)
- Easy to use

## Getting Started

This template does not use node.js as the runtime. It uses [Bun](https://bun.sh) as the runtime. Bun is a runtime like node.js but faster a lot faster. And just better. So make sure you have Bun installed on your machine.

By default all intents are enabled. We highly recommend you to enable only the intents you need. You can do that in the `src/main.ts` file.

1. Clone this repository

- `git clone https://github.com/lassejlv/discord-bot-template-the-best-one.git`

2. Install dependencies

- `bun install` (you can use npm or pnpm if you want)

3. Create a `.env` file

Required environment variables:

```
# For database you can choose between the ones that prismas support.
# In this case we are using postgresql as the database.
DATABASE_URL=
DISCORD_TOKEN=
REDIS_PASSWORD=
REDIS_HOST=
REDIS_PORT=
DISCORD_CLIENT_ID=
# Change log level to none when you are in production
LOG_LEVEL=debug
```

4. Run the bot

- `bun dev` (in development)
- `bun start` (in production)

And you are good to go! Contact me on discord if you have any questions: `lassejlv`

## Using commands

You can have as many sub folders in the "commands" folder as you want. The commands are loaded automatically using bun:glob. The commands are structured in a nice way and are type safe.

Example command:

```ts
import defineCommand from "@/utils/defineCommand";

export default defineCommand({
  data: {
    name: "ping",
    description: "Replies with Pong!",
  },

  execute: async (interaction, client) => {
    await interaction.reply("Pong!");
  },
});
```

In here you have access to the interaction and the client directly (both are type-safe). It's not required to use the client option. But it's there if you need it (wich you probably will).

## Using events

As the commands, the events are also structured in a nice way and are type safe. The events are loaded automatically using bun:glob.

Example event:

```ts
import { Client, Events } from "discord.js";
import defineEvent from "@/utils/defineEvent";

export default defineEvent({
  name: "ClientReady",
  once: true,
  execute: (client: Client) => {
    console.log(`Logged in as ${client.user?.tag} (${client.user?.id})`);
  },
});
```

The name has auto-complete, so dw! The execute function takes the arguments from the event. In this case you will need to import the types from discord.js based on the event you are using.
