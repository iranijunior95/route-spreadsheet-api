import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json({ status: true, message: "my routers" });
});

export default router;