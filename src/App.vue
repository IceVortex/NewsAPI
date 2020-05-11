<template>
  <div id="app">
    <div class="wrapper">
      <div class="container" id="root">
        <p id="title">Pretraži vijesti</p>
        <div class="searchContainer">
          <form id="submitForm">
            <input id="submitArea" type="text" name="keywords" v-model="keywords"/>
            <input id="submitButton" type="image" src="./src/assets/search.svg" @click="getArticles($event)"/>
          </form>
        </div>
        <div class="slidesArray" id="slides">
          <slide v-for="article in articles" :article="article" :key="article.title"></slide>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
const axios = require('axios').default;
import "slick-carousel";

import Slide from "./components/Slide.vue";

export default {
  name: "app",
  components: { Slide },
  data() {
    return {
      keywords: "",
      KEY: "ffa2a5621d404c09942b8e5767b10bcc",
      articles: [],
      slickActivated: false
    };
  },
  methods: {
    async getArticles() {
      event.preventDefault();
      this.articles = [];
      if (this.slickActivated) {
        $(".slidesArray").slick("unslick");
      }
      try {
        const response = await axios.get(
          "http://newsapi.org/v2/top-headlines",
          {
            params: {
              q: this.keywords,
              pageSize: 5,
              apiKey: this.KEY
            }
          }
        );
        this.articles = response.data.articles;
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        $(".slidesArray").slick({
          prevArrow: "<button id='prevButton'></button>",
          nextArrow: "<button id='nextButton'></button>"
        });
        this.slickActivated = true;
      }, 100);
    }
  }
};
</script>

<style lang="sass">
@import './components/sass/app.sass'
</style>

<style src="./components/sass/slick.scss">
