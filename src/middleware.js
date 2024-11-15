import middleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const createMiddleware = middleware.default;

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ka|en)/:path*"],
};
