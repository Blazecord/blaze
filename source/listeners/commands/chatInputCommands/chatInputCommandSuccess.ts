import { Listener, LogLevel, type ChatInputCommandSuccessPayload } from '@sapphire/framework';
import { logSuccessCommand } from '../../../lib/utils';

import type { Logger } from '@sapphire/plugin-logger';
export class UserListener extends Listener {
	public override run(payload: ChatInputCommandSuccessPayload) {
		logSuccessCommand(payload);
	}

	public override onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
		return super.onLoad();
	}
}
