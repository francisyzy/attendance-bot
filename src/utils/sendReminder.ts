import bot from "../lib/bot";
import { PrismaClient, User } from "@prisma/client";
import { sleep } from "./sleep";
import { Markup } from "telegraf";
const prisma = new PrismaClient();

export async function remindUsers(): Promise<void> {
  const usersToNotify = await prisma.user.findMany();

  for (const user of usersToNotify) {
    console.log("Reminding user " + user.name);
    const message = "Time to book in ";
    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback("Check In", "Check-In"),
    ]);

    await sleep(0.5);

    try {
      await bot.telegram.sendMessage(
        user.telegramId,
        message,
        keyboard,
      );
    } catch (e) {
      console.log("Can't notify user about released movie, reason");
      console.log(e);
      // TODO: check if user blocked the bot and delete him from the DB
      //   await prisma.user.update({
      //     where: { telegramId: user.telegramId },
      //     data: { isBanned: true },
      //   });
      // } finally {
      //   await prisma.user.update({
      //     where: { telegramId: user.telegramId },
      //     data: { in: { increment: 1 } },
      //   });
    }
  }
}
export async function remindCheckOut(user: User): Promise<void> {
  console.log("Reminding user " + user.name);
  const message = "Time to book out ";
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback("Check Out", "Check-Out"),
  ]);

  await sleep(0.5);

  try {
    await bot.telegram.sendMessage(
      user.telegramId,
      message,
      keyboard,
    );
  } catch (e) {
    console.log("Can't notify user about released movie, reason");
    console.log(e);
    // TODO: check if user blocked the bot and delete him from the DB
    //   await prisma.user.update({
    //     where: { telegramId: user.telegramId },
    //     data: { isBanned: true },
    //   });
    // } finally {
    //   await prisma.user.update({
    //     where: { telegramId: user.telegramId },
    //     data: { in: { increment: 1 } },
    //   });
  }
}
