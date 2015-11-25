
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
    
    // YOUR CODE GOES HERE!
    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + 
        cityStr + '&api-key=2bcfa403e48c986194e3b6e915af80a7:18:73329005';
    $.getJSON(nytimesURL, function(data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        var article, articleURL, articleName, firstParagraph, articleTemplate;
        var articleList = data.response.docs;
        for (var i = 0, len = articleList.length; i < len; i++) {
            article = articleList[i];
            articleURL = article.web_url;
            articleName = article.headline.main;
            firstParagraph = article.snippet;
            articleTemplate = '<li class="article"><a href="' + articleURL + '">' + articleName +
            '</a><p>' + firstParagraph + '</p></li>';
            $nytElem.append(articleTemplate);
        }
        console.log(data);
    });

    return false;
};

$('#form-container').submit(loadData);
