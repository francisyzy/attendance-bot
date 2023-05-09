import bot from "../lib/bot";
import { PrismaClient } from "@prisma/client";
import { toEscapeHTMLMsg } from "../utils/messageHandler";
import { Scenes, session, Markup, Composer } from "telegraf";
import { getBotCommands } from "../utils/botCommands";
import { sendCheckIn } from "../utils/send";

const prisma = new PrismaClient();
//General checkIn commands
const checkIn = () => {
  bot.action("Check-In", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from!.id },
    });
    if (user) {
      sendCheckIn(user.name);
    } else {
      ctx.editMessageText(
        "You are not registered, /start to register",
      );
    }
    ctx.editMessageText("asdf");
  });
};

export default checkIn;
