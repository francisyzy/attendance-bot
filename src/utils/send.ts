import axios from "axios";
import { format } from "date-fns";

export async function sendRequest(name: string, checkIn: boolean) {
  try {
    let status = 'out';
    if (checkIn) {
      status = 'in';
    }
    let FORM_URL =
      "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZAAI_N0gZUQzlVWTVRS0hUOE1JREVLNDVQSEJTTlIyOS4u";
    let POST_URL =
      "https://forms.office.com/formapi/api/9188040d-6c67-4c5b-b112-36a304b66dad/users/00000000-0000-0000-0006-40008fcdd206/forms('DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZAAI_N0gZUQzlVWTVRS0hUOE1JREVLNDVQSEJTTlIyOS4u')/responses";
    let HEADERS = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
    };

    const today = new Date();
    let todayISO = today.toISOString();
    const formatted = format(today, "yyyy-MM-dd");

    let answers = [
      {
        // full name
        questionId: "r504e2d499cee4cd5aa89d155312be5f3",
        answer1: name,
      },
      {
        // radio button
        questionId: "rf62217b974974e059c5b69387a770b12",
        answer1: `Check ${status}`,
      },
      {
        // time
        questionId: "r4da303e77c874db1989e32b45edea017",
        answer1: formatted,
      },
      {
        // misc
        questionId: "rcdbcf582c8344a35ae6c735e0e638974",
        answer1: null,
      },
    ];

    let data = {
      startDate: todayISO,
      submitDate: todayISO,
      answers: JSON.stringify(answers),
    };

    let responseCode = 0;

    await axios
      .get(FORM_URL, { headers: HEADERS })
      .then(async (response) => {
        if (response.status !== 200) {
          console.log("Fail to fetch");
          responseCode = 404;
        }

        await axios
          .post(POST_URL, data, { headers: HEADERS })
          .then((response) => {
            responseCode = response.status;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    return responseCode;
  } catch (error) {
    console.error(error);
  }
}
