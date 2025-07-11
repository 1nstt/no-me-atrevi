import {Router} from 'express';

const router = Router();

router.post('/login', (req, res) => {
    // Aquí iría la lógica de inicio de sesión
    res.json({message: "Login endpoint"});
});

export default router;