class Poll {
  constructor(fn = () => {}, interval = 2000) {
    this.timer = null;
    this.interval = interval;
    this.fn = fn;
    this.running = false;
  }
  start() {
    if (this.running) return;
    this.running = true;
    const run = () => {
      if (!this.running) return;
      this.fn();
      this.timer = setTimeout(run, this.interval);
    };
    run();
  }
  stop() {
    this.running = false;
    clearTimeout(this.timer);
  }
}

// demo
// 轮询
const xxPoll = new Poll(() => {
  console.log('执行定时任务1');
}, 2000);
xxPoll.start();

// 5秒后停止轮询
setTimeout(() => {
  xxPoll.stop();
  console.log('已停止定时任务1');
}, 5000);

// 再创建一个新的 Poll 实例，间隔1秒
const anotherPoll = new Poll(() => {
  console.log('执行定时任务2');
}, 1000);
anotherPoll.start();

// 3秒后停止第二个轮询
setTimeout(() => {
  anotherPoll.stop();
  console.log('已停止定时任务2');
}, 3500);

