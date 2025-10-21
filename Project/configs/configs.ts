export const configs = {
    mongodbUri: process.env.MONGODB_URI!,
    nextAuthSecret: process.env.NEXTAUTH_SECRET!,
    redisUrl: process.env.REDIS_URL!,
    redisPassword: process.env.REDIS_PASSWORD!,
    redisPort: process.env.REDIS_PORT!,
    portalEmail: process.env.PORTAL_EMAIL!,
    portalPassword: process.env.PORTAL_PASSWORD!,
}