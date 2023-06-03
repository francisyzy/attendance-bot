import bot from "../lib/bot";
import { PrismaClient, User } from "@prisma/client";
import { sleep } from "./sleep";
import { Markup, TelegramError } from "telegraf";
import config from "../config";

const prisma = new PrismaClient();

export async function remindUsers(): Promise<void> {
  const users = await prisma.user.findMany({
    where: { isBanned: false },
  });

  const message = "Time to book in " + config.URL;
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback("Check In", "Check-In"),
  ]);
  for (const user of users) {
    console.log("Reminding user " + user.name);

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

export async function sendReport(): Promise<void> {
  const users = await prisma.user.findMany({
    where: { isBanned: false },
  });

  let usersCount = users.length;
  let remindInCount = 0;
  let inCount = 0;
  let remindOutCount = 0;
  let outCount = 0;

  for (const user of users) {
    remindInCount += user.remindIn;
    inCount += user.in;
    remindOutCount += user.remindOut;
    outCount += user.out;
  }

  const message = `Total users: ${usersCount}

RemindIn: ${remindInCount}
In: ${inCount}
RemindOut: ${remindOutCount}
Out: ${outCount}
AvgRemindIn: ${remindInCount / usersCount}
AvgIn: ${inCount / usersCount}
AvgRemindOut: ${remindOutCount / usersCount}
AvgOut: ${outCount / usersCount}`;

  if (config.LOG_GROUP_ID) {
    bot.telegram.sendMessage(config.LOG_GROUP_ID, message, {
      parse_mode: "HTML",
    });
  }
}
