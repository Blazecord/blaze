import { ApplyOptions } from '@sapphire/decorators';
import { Listener, container } from '@sapphire/framework';

@ApplyOptions<Listener.Options>({ once: false })
export class UserEvent extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			emitter: container.client.ws,
			event: 'GUILD_MEMBER_ADD'
		});
	}
	public override run() {

	}
}
