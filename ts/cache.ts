import { storage } from './storage.ts';

const envConfig = {
  TOKEN_PREFIX: 'MY_PREFIX_',
  TOKEN_KEY: 'token',
  REFRESH_TOKEN_KEY: 'refresh_token',
}

interface StorageData {
  value: unknown;
  expire?: number;
}


/**
 * 缓存管理类
 */
class Cache {
  private prefix: string;

  constructor(prefix = envConfig.TOKEN_PREFIX) {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return this.prefix + key;
  }

  /**
   * 设置缓存
   * @param key 缓存键
   * @param value 缓存值
   * @param expire 过期时间(秒)
   */
  set(key: string, value: unknown, expire?: number): void {
    const data = {
      value,
      expire: expire ? new Date().getTime() + expire * 1000 : undefined,
    };
    storage.setItem(this.getKey(key), JSON.stringify(data));
  }

  /**
   * 获取缓存
   * @param key 缓存键
   * @param defaultValue 默认值
   */
  get<T = unknown>(key: string, defaultValue?: T): T | undefined {
    const item = storage.getItem(this.getKey(key));
    if (!item) return defaultValue;
    try {
      const data: StorageData = JSON.parse(item);
      if (data.expire && data.expire < new Date().getTime()) {
        this.remove(key);
        return defaultValue;
      }
      return data.value as T;
    } catch {
      return defaultValue;
    }
  }

  /**
   * 移除缓存
   * @param key 缓存键
   */
  remove(key: string): void {
    storage.removeItem(this.getKey(key));
  }

  /**
   * 清空缓存
   */
  clear(): void {
    storage.clear();
  }
}

// 创建缓存实例
export const localCache = new Cache(envConfig.TOKEN_PREFIX);
export const sessionCache = new Cache(envConfig.TOKEN_KEY);

// 定义缓存键
export const CacheKey = {
  Token: envConfig.TOKEN_KEY || 'token',
  RefreshToken: envConfig.REFRESH_TOKEN_KEY || 'refresh_token',
} as const;
