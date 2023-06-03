import bot from "../lib/bot";
import { PrismaClient } from "@prisma/client";
import { sendRequest } from "../utils/send";
import config from "../config";

const prisma = new PrismaClient();
//General checkOut commands
const checkOut = () => {
  bot.action("Check-Out", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from!.id },
    });
    if (user) {
      let response = await sendRequest(user.name, false);
      if (response) {
        ctx.editMessageText(`Res Code: ${response.toString()}, at ${new Date().toString()}`);
        if (response == 201) {
          await prisma.user.update({
            where: { telegramId: user.telegramId },
            data: { out: { increment: 1 } },
          });
        }
      } else {
        ctx.editMessageText(`Res Code: ${response.toString()}, at ${new Date().toString()}
error occurred somewhere, go submit manually @ ${config.URL}`,
        );
      }
    } else {
      ctx.editMessageText(
        "You are not registered, /start to register",
      );
      ctx.answerCbQuery();
    }
  });

  bot.command("checkout", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from!.id },
    });
    if (user) {
      let response = await sendRequest(user.name, false);
      if (response) {
        ctx.reply(`Res Code: ${response.toString()}, at ${new Date().toString()}`);
        if (response == 201) {
          await prisma.user.update({
            where: { telegramId: user.telegramId },
            data: { out: { increment: 1 } },
          });
        }
      } else {
        ctx.reply(`Res Code: ${response.toString()}, at ${new Date().toString()}
error occurred somewhere, go submit manually @ ${config.URL}`,
        );
      }
    } else {
      ctx.reply("You are not registered, /start to register");
    }
  });
};

export default checkOut;
