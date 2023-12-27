class EventEmitter {

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



class WithTime extends EventEmitter {
  async execute(asyncFunc: Function, ...args: any[]) {
    console.log("Execution started");
    console.time("execution");
    await asyncFunc();
    console.timeEnd("execution");
    console.log("Execution ended");
  }
}

const withTime = new WithTime();

const Url = "https://jsonplaceholder.typicode.com/posts/1";

let asyncFunction = async () => {
  try {
    const response = await fetch(Url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

withTime.execute(asyncFunction);

// withTime.on('begin', () => console.log('About to execute'));
// withTime.on('end', () => console.log('Done with execute'));

// console.log(withTime.rawListeners("end"));