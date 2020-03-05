$(document).ready(function(){
    $("#submitForm").on("submit", function(event){
        event.preventDefault();

        var keywords = $('input[name=keywords]').val();
        var key = "ffa2a5621d404c09942b8e5767b10bcc";

        if (keywords) {
            $.get("http://newsapi.org/v2/top-headlines", {q: keywords, pageSize: 5, apiKey: key}, function(data){
                console.log(data.articles);
            })
        }
    })
});