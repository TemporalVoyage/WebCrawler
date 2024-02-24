const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')

let count = 1;
test(`Normalize Url ${count}`, () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

count++;
test(`Normalize Url ${count}`, () => {
    expect(normalizeURL('http://blog.boot.dev:80/path')).toBe('blog.boot.dev/path');
});

count++;
test(`Normalize Url ${count}`, () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

count++;
test(`Normalize Url ${count}`, () => {
    expect(normalizeURL('https://blog.boot.dev/path/#hash')).toBe('blog.boot.dev/path');
});

count++;
test(`Normalize Url ${count}`, () => {
    expect(normalizeURL('http://me:pass@blog.boot.dev:80/path/')).toBe('blog.boot.dev/path');
});

count++;
test(`Normalize Url ${count}`, () => {
    expect(normalizeURL('http://blog.boot.dev/path/?query=thing')).toBe('blog.boot.dev/path');
});

count++;
test(`Normalize Url ${count}`, () => {
    expect(normalizeURL('http://blog.boot.dev//path/')).toBe('blog.boot.dev/path');
});

const baseUrl = 'https://blog.boot.dev';

test('getURLsFromHTML absolute URL', () => {
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const result = getURLsFromHTML(inputBody, baseUrl)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(result).toEqual(expected)
  })
  
  test('getURLsFromHTML relative URL', () => {
    const inputBody = '<html><body><a href="/path/to/location"><span>Boot.dev></span></a></body></html>'
    const result = getURLsFromHTML(inputBody, baseUrl)
    const expected = [ 'https://blog.boot.dev/path/to/location' ]
    expect(result).toEqual(expected)
  })
  
  test('getURLsFromHTML both', () => {
    const inputBody = '<html><body><a href="/path/to/location"><span>Boot.dev></span></a><a href="https://test.com/path/to/location"><span>Boot.dev></span></a></body></html>'
    const result = getURLsFromHTML(inputBody, baseUrl)
    const expected = [ 'https://blog.boot.dev/path/to/location', 'https://test.com/path/to/location' ]
    expect(result).toEqual(expected)
  })
  
  test('getURLsFromHTML error', () => {
    const inputBody = '<html><body><a href="path/to/location"><span>Boot.dev></span></a></body></html>'
    const result = getURLsFromHTML(inputBody, baseUrl)
    const expected = [ ]
    expect(result).toEqual(expected)
  })