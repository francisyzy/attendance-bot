import bot from "../lib/bot";
import { PrismaClient } from "@prisma/client";
import { sendRequest } from "../utils/send";
import { remindCheckOut } from "../utils/sendReminder";
import { hoursToMilliseconds } from "date-fns";
import config from "../config";

const prisma = new PrismaClient();
//General checkIn commands
const checkIn = () => {
  bot.action("Check-In", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from!.id },
    });
    if (user) {
      let response = await sendRequest(user.name, true);
      if (response) {
        ctx.editMessageText(response.toString());
        if (response == 201) {
          setTimeout(
            () => remindCheckOut(user),
            hoursToMilliseconds(9.5),
          );
          await prisma.user.update({
            where: { telegramId: user.telegramId },
            data: { in: { increment: 1 } },
          });
        }
      } else {
        ctx.editMessageText(
          "error occurred somewhere, go submit manually " +
            config.URL,
        );
      }
    } else {
      ctx.editMessageText(
        "You are not registered, /start to register",
      );
    }
    ctx.answerCbQuery();
  });

  bot.command("checkin", async (ctx) => {
    const user = await prisma.user.findUnique({
      where: { telegramId: ctx.from!.id },
    });
    if (user) {
      let response = await sendRequest(user.name, true);
      if (response) {
        ctx.reply(response.toString());
        if (response == 201) {
          setTimeout(
            () => remindCheckOut(user),
            hoursToMilliseconds(9.5),
          );
          await prisma.user.update({
            where: { telegramId: user.telegramId },
            data: { in: { increment: 1 } },
          });
        }
      } else {
        ctx.reply(
          "error occurred somewhere, go submit manually " +
            config.URL,
        );
      }
    } else {
      ctx.reply("You are not registered, /start to register");
    }
  });
};

export default checkIn;
