var Crawler = require("crawler");
var crawler = new Crawler({ maxConnections : 10 });

module.exports = function (ctx, done){
    for(x = 0; x <= 10; x++){
        page = x * 10;
        crawler.queue([{
            uri: 'https://www.indeed.com/jobs?q=node.js&start='+page,
            jQuery: true,
            callback: function (error, res, done) {
                if(error){
                    console.log(error);
                } else {
                    var $ = res.$;
                    var company,job,link;
                    var arr = [];
                    var json = '{';
                    $('.result').each(function(key,value){
                        row = $(this).find('.jobtitle a');
                        job = row.text().trim();
                        link = row.attr('href');
                        company = $(this).find('.company span').text().trim();
                        arr[key] = ' { job : "'+job+'", link : "https://www.indeed.com'+link+'", company : "'+company+'" }';
                    });
                    json += arr.join(',');
                    json += ' }';
                    //const json = json;
                    return json;
                }
                done(json, 'Success.');
            }
        }]);
    }
}