import { PrismaClient } from '@prisma/client';

import { redis } from '../../lib';

export class AutoRole {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async get(guildId: string) {
		return await this.prisma.autoRoleSettings.findFirst({
			where: {
				guildId: guildId
			}
		});
	}

	public async set(guildId: string, roleId: string) {
		const redisData = await redis.get(`AUTO_ROLE_${guildId}`);

		if (redisData) {
			await redis.del(`AUTO_ROLE_${guildId}`);

			const data = await this.prisma.autoRoleSettings.findFirst({
				where: {
					guildId: guildId
				}
			});

			if (data) {
				await this.prisma.autoRoleSettings.update({
					where: {
						guildId: guildId
					},
					data: {
						roles: roleId
					}
				});

				await redis.set(`AUTO_ROLE_${guildId}`, JSON.stringify(roleId), 'EX', 180);
			} else if (!data) {
				await this.prisma.autoRoleSettings.create({
					data: {
						guildId: guildId,
						roles: roleId
					}
				});

				await redis.set(`AUTO_ROLE_${guildId}`, JSON.stringify(roleId), 'EX', 180);
			}
		} else if (!redisData) {
			const data = await this.prisma.autoRoleSettings.findFirst({
				where: {
					guildId: guildId
				}
			});

			if (data) {
				await this.prisma.autoRoleSettings.update({
					where: {
						guildId: guildId
					},
					data: {
						roles: roleId
					}
				});

				await redis.set(`AUTO_ROLE_${guildId}`, JSON.stringify(roleId), 'EX', 180);
			} else if (!data) {
				await this.prisma.autoRoleSettings.create({
					data: {
						guildId: guildId,
						roles: roleId
					}
				});

				await redis.set(`AUTO_ROLE_${guildId}`, JSON.stringify(roleId), 'EX', 180);
			}
		}
	}

	public async delete(guildId: string) {
		const redisData = await redis.get(`AUTO_ROLE_${guildId}`);

		if (redisData) {
			await redis.del(`AUTO_ROLE_${guildId}`);

			const data = await this.prisma.autoRoleSettings.findFirst({
				where: {
					guildId: guildId
				}
			});

			if (data) {
				await this.prisma.autoRoleSettings.delete({
					where: {
						guildId: guildId
					}
				});
			}
		} else if (!redisData) {
			const data = await this.prisma.autoRoleSettings.findFirst({
				where: {
					guildId: guildId
				}
			});

			if (data) {
				await this.prisma.autoRoleSettings.delete({
					where: {
						guildId: guildId
					}
				});
			}
		}
	}
}
