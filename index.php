<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="index.js"></script>
    <title>News</title>
</head>

<body>
    <div class="wrapper">
        <div class="container">
            <p id="title">Pretraži vijesti</p>
            <div class="search-container">
                <form id="submitForm">
                    <input id="submitArea" type="text" placeholder="Pretraži" name="keywords">
                    <input id="submitButton" type="image" src="/assets/search.svg" value="send">
                </form>
            </div>
            <div class="slider-container">
                <div class="slide">
                    <div class="slide-image">

                    </div>
                    <div class="slide-text">

                    </div>
                </div>
                <button id="prev"></button>
                <button id="next"></button>
            </div>
        </div>
    </div>
</body>
</html>