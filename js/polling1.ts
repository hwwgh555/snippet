// 轮询
class Poller {
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private isPolling = false;

  constructor(
    private readonly task: () => Promise<void>,
    private readonly interval: number,
    private readonly condition?: () => boolean
  ) {}

  start(immediate = true) {
    if (this.isPolling) {
      console.warn('轮询已在进行中，重复调用start被忽略');
      return;
    }
    this.isPolling = true;

    if (immediate) {
      this.poll();
    } else {
      this.timerId = setTimeout(() => this.poll(), this.interval);
    }
  }

  stop() {
    this.isPolling = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private async poll() {
    if (!this.isPolling) return;
    if (this.condition && !this.condition()) {
      this.stop();
      return;
    }

    try {
      await this.task();
    } catch (error) {
      console.error('轮询任务执行失败:', error);
      this.stop();
    }

    // 使用setTimeout而不是setInterval，确保上一次任务完成后才开始下一次
    if (this.isPolling) {
      this.timerId = setTimeout(() => this.poll(), this.interval);
    }
  }
}

/**
* 轮询间隔时间（毫秒）
  interval?: number;
* 是否在开始时立即执行一次
  immediate?: boolean;
* 轮询条件，返回false时停止轮询
  condition?: () => boolean;
**/


/**
 *
 * @example
 * ```tsx
 * const pollIns = new Poller(async() =>{
 *   const res = await fetchStatus();
 *   if (res.status === 'done') {
 *     stop();
 *   }
 * }, 2000);
 * pollIns.start(true);
 * ```
 */
