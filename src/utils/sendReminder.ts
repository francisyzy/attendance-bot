import bot from "../lib/bot";
import { PrismaClient, User } from "@prisma/client";
import { sleep } from "./sleep";
import { Markup, TelegramError } from "telegraf";
import config from "../config";

const prisma = new PrismaClient();

export async function remindUsers(): Promise<void> {
  const usersToNotify = await prisma.user.findMany({
    where: { isBanned: false },
  });

  for (const user of usersToNotify) {
    console.log("Reminding user " + user.name);
    const message = "Time to book in " + config.URL;
    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback("Check In", "Check-In"),
    ]);

    try {
      await bot.telegram.sendMessage(user.telegramId, message, {
        ...keyboard,
        disable_web_page_preview: true,
      });
      await sleep(0.5);
    } catch (e) {
      console.log("Can't notify user, reason");
      console.log(e);
      if (e instanceof TelegramError) {
        if (
          e.response.description ==
          "Forbidden: bot was blocked by the user"
        ) {
          await prisma.user.update({
            where: { telegramId: user.telegramId },
            data: { isBanned: true },
          });
        }
      }
    } finally {
      await prisma.user.update({
        where: { telegramId: user.telegramId },
        data: { remindIn: { increment: 1 } },
      });
    }
  }
}
export async function remindCheckOut(user: User): Promise<void> {
  console.log("Reminding user " + user.name);
  const message = "Time to book out " + config.URL;
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback("Check Out", "Check-Out"),
  ]);

  try {
    await bot.telegram.sendMessage(user.telegramId, message, {
      ...keyboard,
      disable_web_page_preview: true,
    });
  } catch (e) {
    console.log("Can't notify user, reason");
    console.log(e);
    if (e instanceof TelegramError) {
      if (
        e.response.description ==
        "Forbidden: bot was blocked by the user"
      ) {
        await prisma.user.update({
          where: { telegramId: user.telegramId },
          data: { isBanned: true },
        });
      }
    }
  } finally {
    await prisma.user.update({
      where: { telegramId: user.telegramId },
      data: { remindOut: { increment: 1 } },
    });
  }
}
