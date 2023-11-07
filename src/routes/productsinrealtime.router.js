import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    res.render('realtimeproducts', {
        title: "Real Time Product View",
        style: 'index.css' 
    });
});

export default router;
