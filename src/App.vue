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

<style lang="css">
  #prevButton,
  #nextButton {
    position: absolute;
    top: 250px;
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: 50% 50%;
    background-color: white;
    border: none;
    padding: 35px;
    outline: none;
    cursor: pointer;
  }

  .wrapper {
    margin: 0 auto;
    max-width: 860px;
    min-width: 860px;
    overflow: hidden;
  }

  #title {
    font-size: 50px;
    font-family: Arial, Helvetica, sans-serif;
    color: #4a4a4a;
    font-weight: bold;
    padding-left: 9.2%;
    margin-top: 30px;
  }

  .searchContainer {
    margin-top: -30px;
    padding-left: 9.2%;
    padding-right: 10.8%;
  }

  #submitButton {
    position: relative;
    left: 95%;
    width: 5%;
    bottom: 45px;
    outline: none;
  }

  #submitArea {
    width: 100%;
    height: 50px;
    padding-left: 10px;
    border: 2px solid #adadad;
    border-radius: 5px;
    font-size: 18px;
    outline: none;
  }

  .slidesArray {
    position: relative;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    height: 600px;
    width: 700px;
  }

  #prevButton {
    left: -80px;
    background-image: url("./assets/left-arrow.svg");
  }

  #nextButton {
    left: 710px;
    background-image: url("./assets/right-arrow.svg");
  }
</style>

<style src="./components/sass/slick.scss">
