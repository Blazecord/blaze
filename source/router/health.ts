import { Router } from "express";

import { health } from "../controllers/";

export default (router: Router) => {
    router.get('/health', health);
}