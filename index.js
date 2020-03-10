$(document).ready(function(){
    $("#submitForm").on("submit", function(event){
        event.preventDefault();

        var keywords = $('input[name=keywords]').val();
        var key = "ffa2a5621d404c09942b8e5767b10bcc";

        var articles=null;
        $(".slidesArray").css("visibility", "hidden");
        $("#slides").remove();

        if (keywords) {
            $.get("http://newsapi.org/v2/top-headlines", {q: keywords, pageSize: 5, apiKey: key}, function(data){
                articles = data.articles;
                if (articles.length!=0) {
                    $('.container').append("<div class='slidesArray' id='slides'></div>")
                    $(".slidesArray").css("visibility", "visible");
                    fillSlider(articles);
                    $('.slidesArray').slick({
                        prevArrow: "<button id='prev'></button>",
                        nextArrow: "<button id='next'></button>"
                    });
                }
            });
        }
    });

    function fillSlider(articles) {
        articles.forEach(function(article) {
            if (!article.urlToImage) article.urlToImage = "/assets/Placeholder.jpg";
            if (!article.author) article.author = "Unknown";
            if (!article.description) article.description = "No description.";

            $(".slidesArray").append(
                "<div class='slide'>\
                    <div class='slideImage'>\
                        <img src='"+article.urlToImage+"' class='image'>\
                    </div>\
                    <div class='slideText'>\
                        <p class='articleTitle'>"+article.title+"</p>\
                        <p class='articleAuthor'>Autor: "+article.author+"</p>\
                        <p class='articleDescription'>"+article.description+"</p>\
                        <a class='articleSource' href='"+article.url+"' target='_blank'>Pročitaj članak</a>\
                    </div>\
                </div>"
            );
        });
    }
});