import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asynchandler.js"
import mongoose from "mongoose";


export const healthCheck = asyncHandler(async (req, res) => {

  const dbState = mongoose.connection.readyState;

  const dbStatus =
    dbState === 1
      ? "Connected"
      : dbState === 2
      ? "Connecting"
      : dbState === 3
      ? "Disconnecting"
      : "Disconnected";

  const response = new ApiResponse(
    200,
    {
      server: "Server is Running ",
      database: `Database is ${dbStatus}`,
    },
    "Health check successful"
  );

  res.status(200).json(response);
});