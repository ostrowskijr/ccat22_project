import express, { Request, Response } from "express";
import router from "../../routers";

const app = express();
const PORT = process.env.PORT || 3000;

export default function startServer() {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Welcome to the CCCAT22 - API.",
    });
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
