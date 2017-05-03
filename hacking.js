var Crawler = require("crawler");

module.exports = function(callback){
    var crawler = new Crawler({ maxConnections : 10 });
    for(x = 0; x <= 10; x++){
        page = x * 10;
        crawler.queue([{
            uri: 'https://www.indeed.com/jobs?q=node.js&start=0',
            jQuery: true,
            callback: function (error, res, done) {
                if(error){
                    console.log(error);
                } else {
                    var $ = res.$;
                    var company,job,link;
                    var json = [];
                    if($('#resultsCol .result').length > 0){
                        $('#resultsCol .result').each(function(key,value){
                            row = $(this).find('.jobtitle a');
                            job = row.text().trim();
                            link = row.attr('href');
                            company = $(this).find('.company span').text().trim();
                            json[key] = { job : job, link : 'https://www.indeed.com'+link, company : company };
                        });
                        console.log(json);
                        callback(null, json);
                    }
                }
                done();
            }
        }]);
    }
}