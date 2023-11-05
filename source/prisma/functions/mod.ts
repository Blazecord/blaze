import { PrismaClient } from '@prisma/client';

import { redis } from '../../lib';

export type Timeouts = {
	userId: string;
	guildId: string;
	reason: string;
	expiresAt: Date;
};

export type Warns = {
	userId: string;
	guildId: string;
	reason: string;
	moderator: string;
};

export type Reports = {
	userId: string;
	guildId: string;
	reason: string;
	moderator: string;
};

export class ModerationData {
	private client: PrismaClient;

	constructor() {
		this.client = new PrismaClient();
	}

	public async get(userId: string) {
		await this.client.moderationData.findFirst({
			where: {
				userId: userId
			}
		});
	}

	public async set(userId: string, timeouts: Timeouts[], warns: Warns[], reports: Reports[]): Promise<void> {
		const redisData = await redis.get(`MODERATION_DATA_${userId}`);

		if (redisData) {
			await redis.del(`MODERATION_DATA_${userId}`);
		}

		const moderationData = await this.client.moderationData.findFirst({
			where: {
				userId: userId
			},
			include: {
				timeouts: true,
				warns: true,
				reports: true
			}
		});

		if (moderationData) {
			// Merges the old data with the new data
			const updatedTimeouts = [...moderationData.timeouts, ...timeouts];
			const updatedWarns = [...moderationData.warns, ...warns];
			const updatedReports = [...moderationData.reports, ...reports];

			await this.client.moderationData.update({
				where: {
					userId: userId
				},
				data: {
					timeouts: {
						set: updatedTimeouts.map((timeout) => ({
							userId: timeout.userId,
							guildId: timeout.guildId,
							reason: timeout.reason,
							expiresAt: timeout.expiresAt
						}))
					},
					warns: {
						set: updatedWarns.map((warn) => ({
							userId: warn.userId,
							guildId: warn.guildId,
							reason: warn.reason,
							moderator: warn.moderator
						}))
					},
					reports: {
						set: updatedReports.map((report) => ({
							userId: report.userId,
							guildId: report.guildId,
							reason: report.reason
						}))
					}
				}
			});

			await redis.set(
				`MODERATION_DATA_${userId}`,
				JSON.stringify({ timeouts: updatedTimeouts, warns: updatedWarns, reports: updatedReports }),
				'EX',
				180
			);

			return;
		} else if (!moderationData) {
			await this.client.moderationData.create({
				data: {
					userId: userId,
					timeouts: {
						create: timeouts.map((timeout) => ({
							userId: timeout.userId,
							guildId: timeout.guildId,
							reason: timeout.reason,
							expiresAt: timeout.expiresAt
						}))
					},
					warns: {
						create: warns.map((warn) => ({
							userId: warn.userId,
							guildId: warn.guildId,
							reason: warn.reason,
							moderator: warn.moderator
						}))
					},
					reports: {
						create: reports.map((report) => ({
							userId: report.userId,
							guildId: report.guildId,
							reason: report.reason
						}))
					}
				}
			});

			await redis.set(`MODERATION_DATA_${userId}`, JSON.stringify({ timeouts: timeouts, warns: warns, reports: reports }), 'EX', 180);

			return;
		} else {
			throw new Error('Something went wrong while setting moderation data');
		}
	}

	public async delete(userId: string): Promise<void> {
		// Check if the user exists
		const existingUser = await this.client.moderationData.findFirst({
			where: {
				userId: userId
			}
		});

		if (existingUser) {
			await this.client.moderationData.delete({
				where: {
					userId: userId
				}
			});

			await redis.del(`MODERATION_DATA_${userId}`);
		} else {
			throw new Error('Something went wrong while deleting moderation data');
		}
	}

	public async exists(userId: string): Promise<boolean> {
		const result = await this.client.moderationData.findFirst({
			where: {
				userId: userId
			}
		});

		if (result) {
			return true;
		} else {
			return false;
		}
	}
}
