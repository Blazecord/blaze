import { NextFunction, Response, Request } from 'express';

export const home = (req: Request, res: Response, next: NextFunction): void => {
	// res.redirect('https://i.blaze.merlbot.de')

	res.sendStatus(200).json({
		message: 'redirecting to discord bot invite'
	});
};
