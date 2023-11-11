import { NextFunction, Request, Response } from "express";

export const health = (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json(
        {
            status: 'ok',
        }
    )

    next();
}
