export class DebugTimer {
  constructor() {
    DebugTimer.elapsed = [];
  }

  static start() {
    DebugTimer.elapsed = [];
    DebugTimer.elapsed.push(new Date());
  }

  static log(text) {
    DebugTimer.elapsed.push(new Date());
    console.log(text + ' Time elapsed: ' + (DebugTimer.elapsed[DebugTimer.elapsed.length - 1] - DebugTimer.elapsed[DebugTimer.elapsed.length - 2]) / 1000 + ' seconds.');
  }

  static timeSinceStart() {
    DebugTimer.elapsed.push(new Date());
    console.log('Time since start: ' + (DebugTimer.elapsed[DebugTimer.elapsed.length - 1] - DebugTimer.elapsed[0]) / 1000 + ' seconds.');
  }
}