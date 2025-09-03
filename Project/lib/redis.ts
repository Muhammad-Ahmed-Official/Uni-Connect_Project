import { configs } from "@/configs/configs";
import Redis from "ioredis";

if (!configs.redisUrl) {
    throw new Error("Redis URL is not defined in the configuration.");
}

let redis: Redis;

if (process.env.NODE_ENV === "development") {
    redis = new Redis(configs.redisUrl);
} else {
    redis = new Redis({
        username: "default",
        password: configs.redisPassword,
        host: configs.redisUrl,
        port: parseInt(configs.redisPort || "6379", 10),
    });
}

export { redis };

export async function getOrSetCache<T>(
    key: string,
    ttl: number,
    fetcher: () => Promise<T>,
): Promise<T> {
    const cachedData = await redis.get(key);
    if (cachedData) {
        return JSON.parse(cachedData) as T;
    }

    const data = await fetcher();
    await redis.set(key, JSON.stringify(data), "EX", ttl);
    return data;
}

export async function clearCache(keys: string[]): Promise<void> {
    if (keys.length === 0) return;
    await redis.del(keys);
}
