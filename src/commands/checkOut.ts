import bot from "../lib/bot";
import { PrismaClient } from "@prisma/client";
import { sendCheckOut } from "../utils/send";
import { remindCheckOut } from "../utils/sendReminder";
import { hoursToMilliseconds } from "date-fns";

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
        ctx.editMessageText("error occurred somewhere");
      }
    } else {
      ctx.editMessageText(
        "You are not registered, /start to register",
      );
    }
  });
};

export default checkOut;