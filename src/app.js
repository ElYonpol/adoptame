import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
// swagger
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import __dirname from "./index.js";
import cors from "cors";
import dotenv from "dotenv";


const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

console.log(__dirname);

const swaggerOptions = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "Documentación de app Adoptame",
			description: "Api pensada para adopción de mascotas",
		},
	},
	apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

// endpoint de la documentación
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
