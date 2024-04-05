import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    ignoredRoutes: ['/icons', '/images']
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};