import { openSuccessNotification } from "@/utils/notification";
import { deleteCookie, getCookie } from "cookies-next";
import * as jose from "jose";

import { User } from "@/types/user-type";
import { fetchAuth } from "@/config/xior";

// import { openErrorNotification, openSuccessNotification } from "./notification";

// export async function verifyToken(token: string) {
//   if (!token) return null;

//   const JWKS = jose.createRemoteJWKSet(
//     new URL("https://api.attendancekeeper.net/dt/v1/auth/.well-known/jwks.json"),
//   );

//   try {
//     const { payload } = await jose.jwtVerify(token, JWKS);

//     return payload as Session;
//   } catch (_error) {
//     return null;
//   }
// }

export function decodeToken(token?: string) {
  const accessToken = token ? token : getCookie("accessToken");

  try {
    const user: User = jose.decodeJwt(accessToken as string);

    return user;
  } catch (_error) {
    return null;
  }
}

// var axios = require("axios").default;

// var options = {
//   method: 'POST',
//   url: 'https://api.attendancekeeper.net/dt/v1/auth/logout',
//   headers: {
//     'User-Agent': 'insomnia/9.2.0',
//     Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjUwNzYwNGNmNmE5YWE5NzBkNzY5MTBmM2M5NmUwMDg0Mzc4OWZlMGJiOTkxMWNiNzkxNDM0MWRmNWFmYWNiNjAiLCJ0eXAiOiJKV1QifQ.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MjA2MTU0MjgsInVzZXIiOnsiYWRkcmVzcyI6bnVsbCwiYXZhdGFyIjpudWxsLCJlbWFpbCI6bnVsbCwiaXNfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiIiwicGhvbmUiOiIiLCJyb2xlIjoiIiwic3RhdHVzIjpmYWxzZSwidXVpZCI6Ijc2NmVlMTYzLWI0OGItNDlmMy1hZjJiLWIzYTdjOTE2ZjQ1NCJ9fQ.fmQ9Q9llHuKfM1Io7xRQwE4QF2ieDKlLUl78K5sP5HBV1YBPKcAmppmmXQ9Me8bVeqHi--VeOX1wFYDpa0GvqRIkeGumxkeMKZZlKg4o1Q1aq6GggidC_NW84POjvJhLq1_AJv0h9Jf9l8e6vjGlHFLcl-hko9_Xs64Y7IkRaIzvc2pA_lmUT7j7x-6E3x4CW5x1KtAumBKGEux8wTfjHMf9oantfnpBnN2atpeBWFQWrximUObt26aiVg62vdpu4wo5-gLvqcvIkNyrb15JK0onl9EBaFMnT3RGwz704uUw5_WaRGNV3sJYw72DF6TTxbPR9w1yzo7CgSwpz1Fb1Q'
//   }
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

export function signOut() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  localStorage.clear();

  openSuccessNotification({ description: "You successfully logged out" });

  window.location.href = "/";
}

export function attemptRefresh() {
  const refreshToken = getCookie("refreshToken");

  return fetchAuth.post<{
    data: { access_token: string; refresh_token: string };
  }>("/evident/auth/api/v1/user/refresh-token/", {
    refresh_token: refreshToken,
  });
}
