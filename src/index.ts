import { Message } from "typegram";
import { Telegraf } from "telegraf";

import config from "./config";

import { toEscapeHTMLMsg } from "./utils/messageHandler";
import { printBotInfo } from "./utils/consolePrintUsername";

import bot from "./lib/bot";
import helper from "./commands/helper";
import catchAll from "./commands/catch-all";
import checkIn from "./commands/checkIn";
import checkOut from "./commands/checkOut";
import { remindUsers, sendReport } from "./utils/sendReminder";
import { schedule } from "node-cron";

const index = () => {
  bot.use(Telegraf.log());
  bot.use((ctx, next) => {
    if (
      ctx.message &&
      config.LOG_GROUP_ID &&
      ctx.message.from.username != config.ADMIN_USERNAME
    ) {
      let userInfo: string;
      if (ctx.message.from.username) {
        userInfo = `name: <a href="tg://user?id=${
          ctx.message.from.id
        }">${toEscapeHTMLMsg(ctx.message.from.first_name)}</a> (@${
          ctx.message.from.username
        })`;
      } else {
        userInfo = `name: <a href="tg://user?id=${
          ctx.message.from.id
        }">${toEscapeHTMLMsg(ctx.message.from.first_name)}</a>`;
      }
      const text = `\ntext: ${
        (ctx.message as Message.TextMessage).text
      }`;
      const logMessage = userInfo + toEscapeHTMLMsg(text);
      bot.telegram.sendMessage(config.LOG_GROUP_ID, logMessage, {
        parse_mode: "HTML",
      });
    }
    return next();
  });
  bot.launch();
  printBotInfo(bot);

  helper();
  checkIn();
  checkOut();
  // https://crontab.guru/#30_7_*_*_1-5
  schedule("30 7 * * 1-5", () => {
    remindUsers();
  });

  // https://crontab.guru/#30_7_*_*_7
  schedule("30 7 * * 7", () => {
    sendReport();
  });

  //Catch all unknown messages/commands
  catchAll();
};

if (process.env.NODE_ENV !== "production") {
  index();
}
export default index;
