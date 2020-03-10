$(document).ready(function(){
    $("#submitForm").on("submit", function(event){
        event.preventDefault();

        var keywords = $('input[name=keywords]').val();
        var key = "ffa2a5621d404c09942b8e5767b10bcc";

        var articles=null;
        $(".sliderContainer").css("visibility", "hidden");
        $("#prev").css("visibility", "hidden");
        $("#next").css("visibility", "hidden");

        if (keywords) {
            $.get("http://newsapi.org/v2/top-headlines", {q: keywords, pageSize: 5, apiKey: key}, function(data){
                articles = data.articles;
                document.getElementById("slides").innerHTML = "";

                if (articles.length!=0) {
                    $(".sliderContainer").css("visibility", "visible");

                    if(articles.length>1) {
                        $("#prev").css("visibility", "visible");
                        $("#next").css("visibility", "visible");
                    }

                    fillSlider(articles);

                    if (articles.length==2) {
                        fillSlider(articles);
                    }

                    $('.slide').first().addClass("active");
                    var slides = $('.slide');
                    slides.first().before(slides.last());
                }
            })
        }
    });

    $('button').on('click', function() {
        slides = $('.slide');
        var button = $(this);
        var activeSlide = $('.active');

        if (button.attr('id') == 'next') {
            slides.last().after(slides.first());
            activeSlide.removeClass('active').next('.slide').addClass('active');
        }

        if (button.attr('id') == 'prev') {
            slides.first().before(slides.last());
            activeSlide.removeClass('active').prev('.slide').addClass('active');
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