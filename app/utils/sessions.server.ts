import { createCookieSessionStorage } from "react-router";

type SessionData = {
  token: string;
  refreshToken: string;
};

export type SessionFlashData = {
  message: string;
  success: boolean;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      //   domain: "reactrouter.com",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!

      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      // maxAge: 60,
      // path: "/",
      sameSite: "none",
      secrets: [
        import.meta.env.VITE_JWT_SECRET,
        import.meta.env.VITE_REFRESH_SECRET_KEY,
        import.meta.env.VITE_COOKIE_SECRET,
      ],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
