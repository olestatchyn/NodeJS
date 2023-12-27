class EventEmitter1 {

  listeners: Record<string, Function[]> = {};

  addListener(eventName: string, fn: Function) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(fn);
  }
  
  on(eventName: string, fn: Function) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(fn);
  }
  
  removeListener(eventName: string, fn: Function) {
    if (this.listeners[eventName].length > 1) {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
    } else {
      delete this.listeners[eventName];
    }
  }
  
  off(eventName: string, fn: Function) {
    if (this.listeners[eventName].length > 1) {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
    } else {
      delete this.listeners[eventName];
    }
  }
  
  once(eventName: string, fn: Function) {
    const onceHandler = (...args: any[]) => {
      fn(...args);
      this.removeListener(eventName, onceHandler);
    };

    this.addListener(eventName, onceHandler);
  }
  
  emit(eventName: string, ...args: any[]) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => listener(...args));
    }
  }
  
  listenerCount(eventName: string) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    }
  }
  
  rawListeners(eventName: string) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName];
    }
  }

}









const myEmitter = new EventEmitter1();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code: number, msg: string) => console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));