import logger from 'winston';

class Publisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(topic, subscriber) { // pass an array of subscribers or just pass a single subscriber
    this.subscribers[topic] || (this.subscribers[topic] = []);
    if (Array.isArray(subscriber)) {
      subscriber.forEach((each) => {
        this.subscribers[topic].push(each);
      });
    } else {
      this.subscribers[topic].push(subscriber);
    }
    logger.info(`successfully subscribe ${subscriber.name} to topic ${topic}`.cyan);
  }

  unsubscribe(topic, subscriber) {
    if (!this.subscribers[topic]) return;

    this.subscribers[topic] = this.subscribers[topic].filter((sub) => {
      return sub !== subscriber;
    });
  }

  publish(topic, message) {
    if (!this.subscribers[topic]) return;
    if (this.subscribers[topic].length <= 0) return;

    this.subscribers[topic].forEach((subscriber) => {
      subscriber(message);
    });
    logger.info(`sucessfully published event: ${topic}`.cyan);
  }
}

const publisher = new Publisher();

export default publisher;
