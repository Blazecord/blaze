declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			DISCORD_TOKEN: string | undefined;
			DATABASE_URL: string | undefined;
			PORT: string | undefined;
			WS_PORT: string | undefined;
			COLOR: string | undefined;
			ERROR_COLOR: string | undefined;
			WARNING_COLOR: string | undefined;
			FOOTER: string | undefined;
		}
	}
}

export {};
