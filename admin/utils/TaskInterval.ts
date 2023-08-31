export class TaskInterval {
  private readonly interval: number;
  private timer: NodeJS.Timer | null;
  constructor(interval = 1000) {
    this.interval = interval;
    this.timer = null;
  }
  start(task: () => void) {
    this.stop();
    this.timer = setInterval(task, this.interval);
  }
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
