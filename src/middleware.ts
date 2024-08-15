import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Define public routes that should not require authentication
  publicRoutes: ["/api/uploadthing"], // Add more public routes as needed
});

export const config = {
  // This matcher allows all routes except those with file extensions or under _next to be processed
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
