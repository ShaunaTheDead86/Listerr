import fetch from 'node-fetch';
import fs from 'fs';
import md5 from 'md5';
import prompts from 'prompts';

export default async function getSession() {
	if (fs.existsSync('./session.json'))
		return JSON.parse(fs.readFileSync('./session.json'));

	const api_key = '9865437494f0090b446b425d8bd7d74f';
	const secret = 'aabf31d4ea7ac4cf6c2c263becbf7bb0';
	const alt_api_url = 'https://ws.audioscrobbler.com/2.0/';
	const api_url = 'https://www.last.fm/api/';

	const token = (
		await (
			await fetch(
				`${alt_api_url}?method=auth.gettoken&api_key=${api_key}&format=json`
			)
		).json()
	).token;

	await prompts({
		type: 'text',
		message: `
          ************************************************************************************
	  Please visit the following link to authorize Listerr to access your Last.fm account:
	  ${api_url}auth/?api_key=${api_key}&token=${token}
	  Then press any key to continue...
	  ************************************************************************************
	  `,
	});

	const api_sig = md5(
		`api_key${api_key}methodauth.getSessiontoken${token}${secret}`
	);

	const session_key = (
		await (
			await fetch(
				`${alt_api_url}?method=auth.getSession&api_key=${api_key}&token=${token}&format=json&api_sig=${api_sig}`
			)
		).json()
	).session.key;

	const session_data = {
		api_key,
		api_sig,
		session_key,
	};

	fs.writeFileSync('./session.json', JSON.stringify(session_data));
	return session_data;
}
