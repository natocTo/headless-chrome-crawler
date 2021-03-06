const HCCrawler = require('headless-chrome-crawler');

HCCrawler.launch({
  maxConcurrency: 1, // Max concurrency must be 1 when delay is set
  delay: 2000, // Delay 2000 millisecnds before each request is sent
  evaluatePage: (() => ({
    title: $('title').text(),
  })),
  onSuccess: (result => {
    console.log(result);
  }),
})
  .then(crawler => {
    crawler.queue('https://example.com/');
    crawler.queue('https://example.net/');
    crawler.onIdle()
      .then(() => crawler.close());
  });
