import axios from "axios";
import { format } from "date-fns";

export async function sendCheckIn(name: string) {
  try {
    let formattedDate = format(new Date(), "yyyy-MM-dd");
    let body = `{"startDate":"2023-05-08T09:09:15.006Z","submitDate":"2023-05-08T09:25:11.498Z","answers":"[{\\"questionId\\":\\"r504e2d499cee4cd5aa89d155312be5f3\\",\\"answer1\\":\\"${name}\\"},{\\"questionId\\":\\"rf62217b974974e059c5b69387a770b12\\",\\"answer1\\":\\"Check in\\"},{\\"questionId\\":\\"r4da303e77c874db1989e32b45edea017\\",\\"answer1\\":\\"${formattedDate}\\"},{\\"questionId\\":\\"rcdbcf582c8344a35ae6c735e0e638974\\",\\"answer1\\":null}]"}`;
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r + "d8-d52e-41cd-bff2-510b6b" + r);

    const url =
      "https://forms.office.com/formapi/api/9188040d-6c67-4c5b-b112-36a304b66dad/users/00000000-0000-0000-0006-40008fcdd206/forms('DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZAAI_N0gZUQzlVWTVRS0hUOE1JREVLNDVQSEJTTlIyOS4u')/responses";

    const headers = {
      __requestverificationtoken:
        "IjHaAZP_Dtnyyqj8pLLKBG221OPdNl5x-OdNVR1dZM1gzC0DvxvUGfSQghTDLzazem1IeML-B1CwNeBmmsytz3dbqQREdBipRKfl5nuLANChvrDH-umQ8wmDUY2MjvhEV6u5sAPHGYqiejZ9xQuf0w2",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.5",
      authorization: "",
      "content-type": "application/json",
      "odata-maxverion": "4.0",
      "odata-version": "4.0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-correlationid": r + "d8-d52e-41cd-bff2-510b6b" + r,
      "x-ms-form-request-ring": "msa",
      "x-ms-form-request-source": "ms-formweb",
      "x-usersessionid": "5d783964-8be4-42ac-89a9-19d8a1745ed2",
    };

    let responseCode = 0;

    axios
      .post(url, body, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response);
        responseCode = response.status;
      })
      .catch((error) => {
        console.log(error);
      });

    await new Promise((resolve) => setTimeout(resolve, 5000)); // 3 sec
    return responseCode;
  } catch (error) {
    console.error(error);
  }
}
export async function sendCheckOut(name: string) {
  try {
    let formattedDate = format(new Date(), "yyyy-MM-dd");
    let body = `{"startDate":"2023-05-08T09:09:15.006Z","submitDate":"2023-05-08T09:25:11.498Z","answers":"[{\\"questionId\\":\\"r504e2d499cee4cd5aa89d155312be5f3\\",\\"answer1\\":\\"${name}\\"},{\\"questionId\\":\\"rf62217b974974e059c5b69387a770b12\\",\\"answer1\\":\\"Check in\\"},{\\"questionId\\":\\"r4da303e77c874db1989e32b45edea017\\",\\"answer1\\":\\"${formattedDate}\\"},{\\"questionId\\":\\"rcdbcf582c8344a35ae6c735e0e638974\\",\\"answer1\\":null}]"}`;
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r + "d8-d52e-41cd-bff2-510b6b" + r);

    const url =
      "https://forms.office.com/formapi/api/9188040d-6c67-4c5b-b112-36a304b66dad/users/00000000-0000-0000-0006-40008fcdd206/forms('DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAZAAI_N0gZUQzlVWTVRS0hUOE1JREVLNDVQSEJTTlIyOS4u')/responses";

    const headers = {
      __requestverificationtoken:
        "IjHaAZP_Dtnyyqj8pLLKBG221OPdNl5x-OdNVR1dZM1gzC0DvxvUGfSQghTDLzazem1IeML-B1CwNeBmmsytz3dbqQREdBipRKfl5nuLANChvrDH-umQ8wmDUY2MjvhEV6u5sAPHGYqiejZ9xQuf0w2",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.5",
      authorization: "",
      "content-type": "application/json",
      "odata-maxverion": "4.0",
      "odata-version": "4.0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-correlationid": r + "d8-d52e-41cd-bff2-510b6b" + r,
      "x-ms-form-request-ring": "msa",
      "x-ms-form-request-source": "ms-formweb",
      "x-usersessionid": "5d783964-8be4-42ac-89a9-19d8a1745ed2",
    };

    let responseCode = 0;

    axios
      .post(url, body, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response);
        responseCode = response.status;
      })
      .catch((error) => {
        console.log(error);
      });

    await new Promise((resolve) => setTimeout(resolve, 5000)); // 3 sec
    return responseCode;
  } catch (error) {
    console.error(error);
  }
}
