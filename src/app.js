import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import organizerRoutes from "./routes/organizer.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import categoryRoutes from "./routes/category.routes.js";
import eventRoutes from "./routes/event.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import paymentRoutes from "./routes/payment.routes.js";



const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Event Discovery & Ticketing API is running...",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizers", organizerRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/register", registrationRoutes);
app.use("/api/v1/payments", paymentRoutes);


// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Middleware (MUST BE LAST)
app.use(errorMiddleware);

export default app;