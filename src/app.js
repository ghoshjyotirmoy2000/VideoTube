import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

// import routes
import healthCheckRoutes from "./routes/healthCheck.routes.js";

app.get("/", (req, res) => {
    res.send("Welcome to VideoTube")
})

app.use("/api/v1/healtheCheck" , healthCheckRoutes)

export default app;
