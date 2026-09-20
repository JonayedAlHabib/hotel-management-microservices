import Redis from "ioredis";

// Not created here at module load time — at that point dotenv.config() in index.js
// hasn't run yet (ES module imports execute before any other code in the importing
// file), so process.env.REDIS_URL would still be undefined. Instead, the client is
// built inside connectRedis(), which index.js only calls after dotenv has loaded —
// same reason connectDB() in db.js reads process.env.MONGO_URI inside its function
// body instead of at the top of the file.
let redisClient;

const connectRedis = () => {
  return new Promise((resolve, reject) => {
    redisClient = new Redis(process.env.REDIS_URL);

    redisClient.on("ready", () => {
      console.log("Redis Connected !!");
      resolve();
    });
    redisClient.on("error", (err) => {
      console.error("Redis connection error: ", err);
      reject(err);
    });
  });
};

export { redisClient, connectRedis };
