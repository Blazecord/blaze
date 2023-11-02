import { ApiRequest, ApiResponse, methods, Route, type } from '@sapphire/plugin-api';

export class UserRoute extends Route {
	public constructor(context: Route.Context, options: Route.Options) {
		super(context, {
			...options,
			route: 'health'
		})
	}
	public [methods.GET](_request: ApiRequest, response: ApiResponse) {
		response.json({ status: 'online' });
	}
}
