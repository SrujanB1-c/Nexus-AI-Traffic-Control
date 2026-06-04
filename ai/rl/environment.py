import gymnasium as gym
import numpy as np

class TrafficEnvironment(gym.Env):

    def __init__(self):

        self.action_space = gym.spaces.Discrete(4)

        self.observation_space = gym.spaces.Box(
            low=0,
            high=100,
            shape=(5,),
            dtype=np.float32
        )

    def reset(self, seed=None, options=None):

        state = np.random.rand(5)

        return state, {}

    def step(self, action):

        next_state = np.random.rand(5)

        reward = np.random.uniform(-1, 1)

        terminated = False

        truncated = False

        return (
            next_state,
            reward,
            terminated,
            truncated,
            {}
        )