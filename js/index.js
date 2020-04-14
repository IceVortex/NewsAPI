import "../sass/index.sass";

const axios = require('axios').default;
import $ from "jquery";
import "slick-carousel";
import "../sass/slick.scss";

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
                const response = await axios.get('http://newsapi.org/v2/top-headlines', {
                    params: {
                        q: keywords,
                        pageSize: 6,
                        apiKey: KEY
                    }
                })
                articles = [...response.data.articles];
                if (articles.length!=0) {
                    $('.container').append("<div class='slidesArray' id='slides'></div>")
                    $(".slidesArray").css("visibility", "visible");
                    fillSlider(articles);
                    $('.slidesArray').slick({
                        prevArrow: "<button id='prevButton'></button>",
                        nextArrow: "<button id='nextButton'></button>"
                    });
                }
            }
            catch(error) {
                console.log(`Error: ${error}`);
            }
        }
    });

    function fillSlider(articles) {
        articles.forEach(article => {
            let { urlToImage, author, description, title, url } = article;
            if (!urlToImage) urlToImage = "../assets/Placeholder.jpg";
            if (!author) author = "Unknown";
            if (!description) description = "No description.";

            $(".slidesArray").append(
                `<div class='slide'>
                    <div class='slideImage'>
                        <img src='${urlToImage}' class='image'>
                    </div>
                    <div class='slideText'>
                        <p class='articleTitle'>${title}</p>
                        <p class='articleAuthor'>Autor: ${author}</p>
                        <p class='articleDescription'>${description}</p>
                        <a class='articleSource' href='${url}' target='_blank'>Pročitaj članak</a>
                    </div>
                </div>`
            );
        });
    }
});