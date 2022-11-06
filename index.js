import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import fs from 'fs';
import getSession from './helpers/getSession.js';

const limiter = new Bottleneck({
	reservoir: 250,
	reservoirRefreshAmount: 250,
	reservoirRefreshInterval: 25 * 250,

	maxConcurrent: 50,
	minTime: 0,
});

const alt_api_url = 'https://ws.audioscrobbler.com/2.0/';
const api_url = 'https://www.last.fm/api/';

const session = await getSession();
console.log(session);
