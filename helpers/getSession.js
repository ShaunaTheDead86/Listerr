import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import fs from 'fs';
import md5 from 'md5';
import prompts from 'prompts';

export default async function getSession() {
	const alt_api_url = 'https://ws.audioscrobbler.com/2.0/';
	const api_url = 'https://www.last.fm/api/';

	const getSession = async () => {
		const key = '9865437494f0090b446b425d8bd7d74f';
		const secret = 'aabf31d4ea7ac4cf6c2c263becbf7bb0';
		const token = (
			await (
				await fetch(
					`${alt_api_url}?method=auth.gettoken&api_key=${key}&format=json`
				)
			).json()
		).token;

		await prompts({
			type: 'text',
			message: `
          ************************************************************************************
	  Please visit the following link to authorize Listerr to access your Last.fm account:
	  ${api_url}auth/?api_key=${key}&token=${token}
	  Then press any key to continue...
	  ************************************************************************************
	  `,
		});

		const api_sig = md5(
			`api_key${key}methodauth.getSessiontoken${token}${secret}`
		);

		const session = await (
			await fetch(
				`${alt_api_url}?method=auth.getSession&api_key=${key}&token=${token}&format=json&api_sig=${api_sig}`
			)
		).text();

		fs.writeFileSync('./session.json', session);
		return session;
	};

	const session = (await fs.existsSync('./session.json'))
		? JSON.parse(fs.readFileSync('./session.json'))
		: await getSession();

	return session;
}
