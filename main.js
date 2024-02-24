const { getURLsFromHTML } = require('./crawl.js')

const html = `<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="/path/to/location"><span>Go to Boot.dev</span></a>
</body>
</html>
`;

getURLsFromHTML(html,'');