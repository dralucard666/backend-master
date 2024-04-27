import { pubsub } from "./subscription-sub.js";

const eventName = "NUMBER_INCREMENTED";

function incrementTimeEvent(time: number) {
  pubsub.publish(eventName, {
    timeSub: { time },
  });
}

function incrementTime() {
  currentTime++;
  incrementTimeEvent(currentTime);
  setTimeout(incrementTime, 10000);
}
let currentTime = 0;
incrementTime();

export const GetCurrentTime = () => {
  return currentTime;
};

export const GetSubCurrentTime = {
  subscribe: () => {
    return pubsub.asyncIterator([eventName]) as any;
  },
};
