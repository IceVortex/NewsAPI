$(document).ready(function(){
    $("#submitForm").on("submit", function(event){                      // dodat reload/refresh
        event.preventDefault();

        var keywords = $('input[name=keywords]').val();
        var key = "ffa2a5621d404c09942b8e5767b10bcc";

        var articles;

        if (keywords) {
            $.get("http://newsapi.org/v2/top-headlines", {q: keywords, pageSize: 5, apiKey: key}, function(data){
                articles = data.articles;

                if (articles.length!=0) {
                    
                    for (var i=0; i<articles.length; i++) {
                        console.log(articles[i]);
                        $(".slidesArray").append("<div class='slide'><div class='slideImage'></div><div class='slideText'></div></div>");
                        if (articles[i].urlToImage) {
                            $(".slideImage").eq(i).append("<img src='"+articles[i].urlToImage+"' class='image'>");
                            var img = new Image();
                            img.src = articles[i].urlToImage;
                            var margin = (-0.5*img.width).toString();
                            console.log(margin);                        // popravit kasnije
                            $(".image").eq(i).css("margin-left", margin+"px");
                        }
                        if (articles[i].title) {
                            $(".slideText").eq(i).append("<p class='articleTitle'>"+articles[i].title+"</p>");
                        }
                        if (articles[i].author) {
                            $(".slideText").eq(i).append("<p class='articleAuthor'>Autor: "+articles[i].author+"</p>");
                        }
                        if (articles[i].description) {
                            $(".slideText").eq(i).append("<p class='articleDescription'>"+articles[i].description+"</p>");
                        }
                        if (articles[i].url) {
                            $(".slideText").eq(i).append("<a class='articleSource' href='"+articles[i].url+"' target='_blank'>Pročitaj članak</a>");
                        }
                    }
                }
            })
        }
    })
});