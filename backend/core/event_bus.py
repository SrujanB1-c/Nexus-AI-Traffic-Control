from collections import defaultdict

class EventBus:

    def __init__(self):
        self.listeners = defaultdict(list)

    def subscribe(self, event, callback):
        self.listeners[event].append(callback)

    async def publish(self, event, payload):

        for callback in self.listeners[event]:
            await callback(payload)