import { Router } from "express";

export const router = Router();

router.get("/", (req, res, _next) => {
    res.send("Server is up and running");
});
