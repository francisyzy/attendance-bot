import bot from "../lib/bot";
import { PrismaClient } from "@prisma/client";
import { sendCheckOut } from "../utils/send";
import config from "../config";

const prisma = new PrismaClient();
//General checkOut commands
const checkOut = () => {
  bot.action("Check-Out", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from!.id },
    });
    if (user) {
      let response = await sendCheckOut(user.name);
      if (response) {
        ctx.editMessageText(response.toString());
        if (response == 201) {
          await prisma.user.update({
            where: { telegramId: user.telegramId },
            data: { out: { increment: 1 } },
          });
        }
      } else {
        ctx.editMessageText("error occurred somewhere, go do it manually " + config.URL);
      }
    } else {
      ctx.editMessageText(
        "You are not registered, /start to register",
      );
      
    }
  });
  bot.command("checkout", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from!.id },
    });
    if (user) {
      let response = await sendCheckOut(user.name);
      if (response) {
        ctx.reply(response.toString());
        if (response == 201) {
          await prisma.user.update({
            where: { telegramId: user.telegramId },
            data: { out: { increment: 1 } },
          });
        }
      } else {
        ctx.reply("error occurred somewhere, go do it manually " + config.URL);
      }
    } else {
      ctx.reply(
        "You are not registered, /start to register",
      );
    }
  });
};

export default checkOut;
