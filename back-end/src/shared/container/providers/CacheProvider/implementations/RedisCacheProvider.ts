import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@config/cache'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = this.client || new Redis(cacheConfig.config.redis)
  }

  /* public async save(key: string, value: any): Promise<void> {
    // 10s
    // 24h
    await this.client.set(key, JSON.stringify(value), 'EX', 10 * 60 * 60 * 24)
  } */

  public async save(
    key: string,
    value: any,
    expiresIn: number = 24 * 60 * 60,
  ): Promise<void> {
    // expiresIn é o tempo de expiração em segundos (padrão: 24 horas)
    await this.returnPrefixCache()

    await this.client.set(key, JSON.stringify(value), 'EX', expiresIn)
  }

  public async recover<T>(key: string): Promise<T | null> {
    console.log('Estou na cache', key)
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data) as T

    return parsedData
  }

  public async invalidate(key: string): Promise<void> {
    console.log('invalidate cache', key)
    await this.client.del(key)
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    console.log('vou deletar todos os prefix::', prefix)
    const keys = await this.client.keys(`${prefix}:*`)
    console.log('keys os prefix::', keys)

    const pipeline = this.client.pipeline()

    keys.forEach((key) => {
      pipeline.del(key)
    })

    await pipeline.exec()
  }

  public async returnPrefixCache(): Promise<void> {
    const keys = await this.client.keys(`*`)
    console.log('redis update key all::', keys)

    const pipeline = this.client.pipeline()

    keys.forEach((key) => {
      console.log(key)
      console.log(this.client.expire(key, 10))
    })

    await pipeline.exec()

    /* const promises = keys.map(async (key) => {
      console.log(key)
      await this.client.expire(key, 10)
    })

    await Promise.all(promises) */
  }
}
