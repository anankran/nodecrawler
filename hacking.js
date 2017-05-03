var Crawler = require("crawler");
var crawler = new Crawler({
    maxConnections: 10,
    debug: true,
    jquery: true,
    forceUTF8: true
});

module.exports = function(context,callback){
    var page = Number(context.data.page) - 1;
    if(page !== undefined && page !== '' && page !== null){
        pageLimit = page * 10;
        crawler.queue([{
            uri: 'https://www.indeed.com/jobs?q=node.js&start='+pageLimit,
            callback: function (error,response,done) {
                if(error){
                    console.log(error);
                } else {
                    var $ = response.$;
                    var company,job,link;
                    var json = [];
                    if($('#resultsCol .result').length > 0){
                        var jobKey = 0;
                        $('#resultsCol .result').each(function(key,value){
                            row = $(this).find('h2 a');
                            job = row.text().trim();
                            if(job !== '' && job !== null && job !== undefined){
                                link = row.attr('href');
                                company = $(this).find('.company span').text().trim();
                                json[jobKey] = { job : job, link : 'https://www.indeed.com'+link, company : company };
                                ++jobKey;
                            }
                        });
                        callback(null,json);
                    } else {
                        callback(null,'No data found!');
                    }
                }
                done();
            }
        }]);
    } else {
        callback(null,'Select a page!');
    }
}