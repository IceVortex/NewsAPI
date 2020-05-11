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

<style lang="sass">
@import './sass/slide.sass'
</style>