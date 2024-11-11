import { createClient } from 'redis';
import logger from './winston-logger';

class RedisClient {
    private client;

    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => logger.error('Redis Client Error', err));
    }

    async connect(): Promise<void> {
        if (!this.client.isOpen) {
            await this.client.connect();
            logger.info('Redis Client Connected');
        }
    }

    async disconnect(): Promise<void> {
        if (this.client.isOpen) {
            await this.client.disconnect();
            logger.info('Redis Client Disconnected');
        }
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async set<T>(key: string, value: T, ttlInSeconds: number): Promise<void> {
        await this.client.setEx(key, ttlInSeconds, JSON.stringify(value));
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key);
    }
}

export const redisClient = new RedisClient();
