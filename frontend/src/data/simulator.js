export function generateTrafficData() {
  return {
    vehicles:
      Math.floor(Math.random() * 10000),

    speed:
      Math.floor(Math.random() * 60),

    congestion:
      Math.floor(Math.random() * 100),

    emissions:
      Math.floor(Math.random() * 1000)
  };
}