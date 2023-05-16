import bot from "../lib/bot";
import { PrismaClient } from "@prisma/client";
import { toEscapeHTMLMsg } from "../utils/messageHandler";
import { Scenes, session, Markup, Composer } from "telegraf";
import { getBotCommands } from "../utils/botCommands";

const prisma = new PrismaClient();
//General helper commands
const helper = () => {
  const nameHandler = new Composer<Scenes.WizardContext>();
  nameHandler.on("text", async (ctx) => {
    await prisma.user.upsert({
      where: { telegramId: ctx.from.id },
      update: { name: ctx.message.text, isBanned: false },
      create: {
        telegramId: ctx.from.id,
        name: ctx.message.text,
      },
    });
    await ctx.replyWithHTML(
      `Great! Your name is now set as <u>${ctx.message.text}</u>\n/help to learn more about the bot`,
    );
    return await ctx.scene.leave();
  });
  nameHandler.on("message", (ctx) =>
    ctx.reply("Only text messages please"),
  );

  const startWizard = new Scenes.WizardScene<Scenes.WizardContext>(
    "starterWizard",
    async (ctx) => {
      ctx.setMyCommands(getBotCommands());
      if (ctx.from) {
        await prisma.user.upsert({
          where: { telegramId: ctx.from.id },
          update: { name: ctx.from.first_name, isBanned: false },
          create: {
            telegramId: ctx.from.id,
            name: ctx.from.first_name,
          },
        });
      }
      if (ctx.message && ctx.message.chat.type === "private") {
        await ctx.reply("Send me your full name");
        return ctx.wizard.next();
      } else {
        await ctx.reply("Please start the bot in a private chat");
        return await ctx.scene.leave();
      }
    },
    nameHandler,
  );

  const stage = new Scenes.Stage<Scenes.WizardContext>([startWizard]);
  bot.use(session());
  bot.use(stage.middleware());

  //All bots start with /start
  bot.start((ctx) => {
    ctx.setMyCommands(getBotCommands());
    return ctx.scene.enter("starterWizard");
  });

  bot.command("account", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from.id },
    });
    if (user) {
      return ctx.replyWithHTML(
        `<b>Name</b>: ${toEscapeHTMLMsg(user.name)}`,
      );
    } else {
      return ctx.reply("Please /start to create an account");
    }
  });
  bot.help((ctx) =>
    ctx.reply(
      `/checkin to check in\n/checkout to check out\n/start to set your name again.
\n201 means HTTP Response code 201 which means success, otherwise it will tell u got error.
will send you reminder to check in at 730am then check out at the right time (hopefully)`,
    ),
  );
};

export default helper;
