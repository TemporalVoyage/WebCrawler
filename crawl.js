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
    return `${urlObj.protocol}//${hostname}/${pathname}`;
}

function getURLsFromHTML(htmlBody,baseUrl){
    const result = [];
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    for (const a of anchors){
      if(a.href.includes('about:blank') || a.href.includes('javascript:') || a.href.length < 5){
        continue;
      }
      if (a.href.substring(0,1) == '/' || a.href.substring(0,1) == '?'){
        try {
            //console.log(`Testing Base plus URL: ${baseUrl+a.href}`);
            result.push(new URL(a.href, baseUrl).href);
        } catch (e){
          //console.log(`Testing Base plus URL failed: ${a.href}`);
          console.log(`${a.href}: ${e.message}`);
        }
      } else {
        try {
            //console.log(`Good URL: ${a.href}`);
            result.push(new URL(a.href).href);
        } catch (e){
          console.log(`Good URL failed: ${a.href}`);
          console.log(`${a.href}: ${e.message}`);
        }
      }
    }
    return result;
}

async function crawlPage(baseUrl,currentUrl,pages){
  let norm = normalizeURL(currentUrl);
  if(new URL(norm).hostname!=new URL(baseUrl).hostname){
    return pages;
  }
  if(norm in pages){
    //console.log('Increment page count')
    pages[norm] += 1;
    return pages;
  }else{
    if(baseUrl==norm){
      pages[norm] = 0;
    }else{
      pages[norm] = 1;
    }
    //console.log(`${norm}: ${currentUrl}`);
  }
  let tryCount = 5;
  let failed = true;
  while(failed && tryCount>0){
    try {
      const response = await fetch(currentUrl);
      if (response.status > 399){
        console.log(`Error: ${response.status}`);
        tryCount -= 1;
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      const contentType = response.headers.get('content-type');
      if (!contentType.includes('text/html')){
        console.log(`non-html response: ${contentType}`);
        return pages;
      }
      failed = false;
      const urls = getURLsFromHTML(await response.text(),baseUrl);
      for(const url of urls){
        pages = await crawlPage(baseUrl,url,pages);
      }
    } catch (e){
      console.log(e.message);
      tryCount -= 1;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return pages;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}