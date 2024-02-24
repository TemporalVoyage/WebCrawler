const { crawlPage } = require('./crawl.js')
const { normalizeURL } = require('./crawl.js')

async function main(){
    if (process.argv.length < 3){
      console.log('a website is needed');
      return;
    }
    if (process.argv.length > 3){
      console.log('you provided too many arguments');
      return;
    }
  
    const baseURL = normalizeURL(process.argv[2]);
  
    console.log(`starting to crawl: ${baseURL}`);
    let pages = {};
    pages = await crawlPage(baseURL,baseURL,pages);
    for(let key in pages){
      console.log(key,pages[key]);
    }
  }
  
  main();