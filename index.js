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

                    /*for (var i=0; i<articles.length; i++) {
                        console.log(articles[i]);
                        $(".slide-image-container").append("<img src='"+articles[i].urlToImage+"' class='image'>");
                    }*/

                    console.log(articles);
                    if (articles[0].urlToImage) {
                        $(".slide-image").append("<img src='"+articles[0].urlToImage+"' class='image'>");
                        
                        var img = new Image();
                        img.src = articles[0].urlToImage;
                        var margin = (-0.5*img.width).toString();

                        console.log(margin+"px");

                        $(".image").css("margin-left", margin+"px");
                    }
                    if (articles[0].title) {
                        $(".slide-text").append("<p class='articleTitle'>"+articles[0].title+"</p>");
                    }
                    if (articles[0].author) {
                        $(".slide-text").append("<p class='articleAuthor'>Autor: "+articles[0].author+"</p>");
                    }
                    if (articles[0].description) {
                        $(".slide-text").append("<p class='articleDescription'>"+articles[0].description+"</p>");
                    }
                    if (articles[0].url) {
                        $(".slide-text").append("<a class='articleSource' href='"+articles[0].url+"' target='_blank'>Pročitaj članak</a>");
                    }
                }
            })
        }
    })
});