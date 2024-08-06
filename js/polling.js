// 轮询
const xxPoll = new Poll(fn, 2000);
xxPoll.start();

class Poll {
  constructor(fn = () => {}, interval = 2000) {
    this.timer = null;
    this.interval = 2000;
    this.fn = fn;
  }
  start() {
    this.timer = setTimeout(() => {
      this.fn();
    }, this.interval)
  }
  stop() {
    clearTimeout(this.timer);
  }
}
