const axios = require('axios');
const { parseStringPromise } = require('xml2js');

async function testParsing() {
  try {
    const response = await axios.get('http://127.0.0.1:8080/stat', { timeout: 1500 });
    const xml = response.data;
    console.log('Raw XML received:', xml.substring(0, 200));
    
    const result = await parseStringPromise(xml);
    console.log('\nParsed structure:', JSON.stringify(result, null, 2));
    
    const rtmp = result.rtmp;
    const server = rtmp?.server?.[0];
    const applications = server?.application || [];
    console.log('\nApplications found:', applications.length);
    
    const liveApp = applications.find((app) => app.name?.[0] === 'live');
    console.log('\nLive app:', liveApp ? 'FOUND' : 'NOT FOUND');
    
    if (liveApp) {
      console.log('liveApp.live exists:', !!liveApp.live);
      console.log('liveApp.live[0] exists:', !!liveApp.live?.[0]);
      console.log('liveApp.live[0].stream exists:', !!liveApp.live?.[0]?.stream);
      
      if (liveApp.live?.[0]?.stream) {
        const stream = liveApp.live[0].stream[0];
        console.log('\nStream name:', stream.name?.[0]);
        console.log('Video bitrate:', stream.bw_video?.[0]);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testParsing();
