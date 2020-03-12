$(document).ready(() => {
    $("#submitForm").on("submit", async (event) => {
        event.preventDefault();

        let keywords = $('input[name=keywords]').val();
        const KEY = "ffa2a5621d404c09942b8e5767b10bcc";

        let articles = null;
        $(".slidesArray").css("visibility", "hidden");
        $("#slides").remove();

        if (keywords) {
            try {
                await $.get("http://newsapi.org/v2/top-headlines", {q: keywords, pageSize: 5, apiKey: KEY}, data => {
                    articles = data.articles;
                    if (articles.length!=0) {
                        $('.container').append("<div class='slidesArray' id='slides'></div>")
                        $(".slidesArray").css("visibility", "visible");
                        fillSlider(articles);
                        $('.slidesArray').slick({
                            prevArrow: "<button id='prevButton'></button>",
                            nextArrow: "<button id='nextButton'></button>"
                        });
                    }
                });
            }
            catch(error) {
                console.log(`Status: ${error.status}`);
            }
        }
    });

    function fillSlider(articles) {
        articles.forEach(article => {
            if (!article.urlToImage) article.urlToImage = "/assets/Placeholder.jpg";
            if (!article.author) article.author = "Unknown";
            if (!article.description) article.description = "No description.";

            $(".slidesArray").append(
                `<div class='slide'>
                    <div class='slideImage'>
                        <img src='${article.urlToImage}' class='image'>
                    </div>
                    <div class='slideText'>
                        <p class='articleTitle'>${article.title}</p>
                        <p class='articleAuthor'>Autor: ${article.author}</p>
                        <p class='articleDescription'>${article.description}</p>
                        <a class='articleSource' href='${article.url}' target='_blank'>Pročitaj članak</a>
                    </div>
                </div>`
            );
        });
    }
});