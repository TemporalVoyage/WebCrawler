const { crawlPage } = require('./crawl.js')

async function main(){
    if (process.argv.length < 3){
      console.log('a website is needed');
      return;
    }
    if (process.argv.length > 3){
      console.log('you provided too many arguments');
      return;
    }
  
    const baseURL = process.argv[2];
  
    console.log(`starting to crawl: ${baseURL}`);

    await crawlPage(baseURL);
  }
  
  main();