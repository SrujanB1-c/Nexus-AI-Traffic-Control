import asyncio

class Scheduler:

    def __init__(self):
        self.tasks = []

    async def start(self):

        while True:

            for task in self.tasks:
                await task()

            await asyncio.sleep(1)