$(document).ready(function(){
    $("#submitForm").on("submit", function(event){
        event.preventDefault();

        var keywords = $('input[name=keywords]').val();
        var key = "ffa2a5621d404c09942b8e5767b10bcc";

        var articles;

        if (keywords) {
            $.get("http://newsapi.org/v2/top-headlines", {q: keywords, pageSize: 5, apiKey: key}, function(data){
                console.log(data);
                articles = data.articles;
                document.getElementById("slides").innerHTML = "";

                if (articles.length!=0) {
                    $(".sliderContainer").css("visibility", "visible");
                    
                    for (var i=0; i<articles.length; i++) {
                        $(".slidesArray").append("<div class='slide'><div class='slideImage'></div><div class='slideText'></div></div>");
                        if (articles[i].urlToImage) {
                            $(".slideImage").eq(i).append("<img src='"+articles[i].urlToImage+"' class='image'>");
                            /*var img = new Image();
                            img.src = articles[i].urlToImage;
                            var margin = (-0.5*img.width).toString();
                            console.log(margin);                        // popravit kasnije
                            $(".image").eq(i).css("margin-left", margin+"px");*/
                        }
                        else {
                            $(".slideImage").eq(i).append("<img src='/assets/Placeholder.jpg' class='image'>");
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

    var transition = 86;    // 10% = 86px

    $('#next').on('click', function () {
        var button = $(this);
        button.prop('disabled', true);

        var last = $('.slide').last();
        last.prependTo('.slidesArray');
        transition-=700;
        $('.slidesArray').css("marginLeft", transition.toString()+"px");
        transition+=700;
        $('.slidesArray').animate({marginLeft: transition.toString()+"px"}, 300, function(){
            button.prop('disabled', false);
        });

        //$('#slides').css({"transition": "all 1s" ,"transform": "translateX("+transition.toString()+"px)"});

        //$('#slides').addClass("animate");

    });

    $('#prev').on('click', function () {
        var button = $(this);
        button.prop('disabled', true);

        var first = $('.slide').first();
        first.appendTo('.slidesArray');
        transition+=700;
        $('.slidesArray').css("marginLeft", transition.toString()+"px");
        transition-=700;
        $('.slidesArray').animate({marginLeft: transition.toString()+"px"}, 300, function(){
            button.prop('disabled', false);
        });
    });
});