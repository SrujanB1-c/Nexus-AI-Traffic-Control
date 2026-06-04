from stable_baselines3 import PPO

from environment import TrafficEnvironment

env = TrafficEnvironment()

model = PPO(
    "MlpPolicy",
    env,
    verbose=1
)

model.learn(
    total_timesteps=100000
)

model.save(
    "traffic_ppo"
)