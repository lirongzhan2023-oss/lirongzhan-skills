#!/usr/bin/env node
// 每日晨报自动推送脚本

const https = require('https');

// 获取江门天气
function getWeather() {
  return new Promise((resolve, reject) => {
    https.get('https://wttr.in/%E6%B1%9F%E9%97%A8?format=j1', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const current = json.current_condition[0];
          resolve({
            temp: current.temp_C,
            condition: current.weatherDesc[0].value,
            humidity: current.humidity,
            wind: current.windspeedKmph,
            time: current.localObsDateTime
          });
        } catch(e) {
          resolve({ error: '获取天气失败' });
        }
      });
    }).on('error', () => {
      resolve({ error: '网络请求失败' });
    });
  });
}

// 生成晨报内容
async function generateMorningReport() {
  const weather = await getWeather();
  
  const date = new Date().toLocaleDateString('zh-CN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  let report = `🌤️ 每日晨报 - ${date}\n\n`;
  report += `【江门天气】\n`;
  report += `🌡️ 温度：${weather.temp || '?'}°C\n`;
  report += `🌤️ 天气：${weather.condition || '?'}\n`;
  report += `💧 湿度：${weather.humidity || '?'}%\n`;
  report += `🌬️ 风速：${weather.wind || '?'}km/h\n\n`;
  report += `【今日提醒】\n`;
  report += `• 早会时间：9:30\n`;
  report += `• 检查外卖后台数据\n`;
  report += `• 查看昨日营收报表\n\n`;
  report += `━━━━━━━━━━━━━━━━━━\n`;
  report += `新的一天，加油！💪`;
  
  return report;
}

generateMorningReport().then(report => {
  console.log(report);
});
