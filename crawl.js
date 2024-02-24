const { JSDOM } = require('jsdom')

function normalizeURL(url){
    const urlObj = new URL(url);
    let pathname = urlObj.pathname;
    let hostname = urlObj.hostname;
    while(pathname.startsWith('/')){
        pathname = pathname.substring(1);
    }
    while(pathname.endsWith('/')){
        pathname = pathname.substring(0,pathname.length-1);
    }
    while(hostname.startsWith('/')){
        hostname = hostname.substring(1);
    }
    while(hostname.endsWith('/')){
        hostname = hostname.substring(0,hostname.length-1);
    }
    return `${hostname}/${pathname}`;
}

function getURLsFromHTML(htmlBody,baseUrl){
    const result = [];
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    for (const a of anchors){
      if (a.href.substring(0,1) == '/'){
        try {
            result.push(new URL(a.href, baseUrl).href);
        } catch (e){
          console.log(`${a.href}: ${e.message}`);
        }
      } else {
        try {
            result.push(new URL(a.href).href);
        } catch (e){
          console.log(`${a.href}: ${e.message}`);
        }
      }
    }
    return result;
}

async function crawlPage(baseUrl){
  try {
    const response = await fetch(baseUrl);
    if (response.status > 399){
      console.log(`Error: ${response.status}`)
      return
    }
    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')){
      console.log(`non-html response: ${contentType}`);
      return;
    }
    console.log(await response.text());
  } catch (e){
    console.log(e.message);
  }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}