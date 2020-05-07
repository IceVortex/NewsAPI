<template>
    <div>
        <div class="slideImage">
            <img v-bind:src="article.urlToImage ? article.urlToImage : './assets/Placeholder.jpg'" class="image">
        </div>
        <div class="slideText">
            <p class="articleTitle">{{article.title | length_limit(100)}}</p>
            <p class="articleAuthor">Autor: {{article.author ? article.author : 'Unknown'}}</p>
            <p class="articleDescription">{{article.description ? article.description : "No description."}}</p>
            <a class="articleSource" v-bind:href="article.url" target="_blank">Pročitaj članak</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['article'],
    filters: {
        length_limit: function (value, size) {
            if (!value) return '';
            value = value.toString();
  
            if (value.length <= size) {
                return value;
            }
            return value.substr(0, size) + '...';
        }
    }
}
</script>

<style lang="css">
.slideImage {
  white-space: nowrap;
  overflow: hidden;
  width: 45%;
  height: 600px;
  border-radius: 5px 0px 0px 5px; }

.slideText {
  position: relative;
  width: 55%;
  left: 45%;
  bottom: 600px;
  height: 600px;
  background-color: #ebebeb;
  border-radius: 0px 5px 5px 0px; }

.image {
  height: 100%; }
  .articleTitle {
  font-family: Arial, Helvetica, sans-serif;
  color: #4a4a4a;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 30px;
  font-weight: bold;
  margin-top: 0px;
  padding-top: 30px; }

.articleAuthor {
  font-family: Arial, Helvetica, sans-serif;
  color: #4a4a4a;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 13px;
  margin-top: -50px; }

.articleDescription {
  font-family: Arial, Helvetica, sans-serif;
  color: #4a4a4a;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 18px;
  line-height: 130%;
  margin-top: -10px; }

.articleSource {
  position: absolute;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 30px;
  bottom: 5%;
  color: #4a4a4a;
  outline: none; }
</style>