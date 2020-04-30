Vue.filter('length_limit', function (value, size) {
    if (!value) return '';
    value = value.toString();
  
    if (value.length <= size) {
      return value;
    }
    return value.substr(0, size) + '...';
  });

Vue.component('slide', {
    props: {
        article: { required: true }
    },
    template: `<div><div class="slideImage">
                <img v-bind:src="article.urlToImage ? article.urlToImage : './assets/Placeholder.jpg'" class="image">
                </div>
                <div class="slideText">
                    <p class="articleTitle">{{article.title | length_limit(100)}}</p>
                    <p class="articleAuthor">Autor: {{article.author ? article.author : 'Unknown'}}</p>
                    <p class="articleDescription">{{article.description ? article.description : "No description."}}</p>
                    <a class="articleSource" v-bind:href="article.url" target="_blank">Pročitaj članak</a>
                </div></div>`
})

new Vue({
    el: '#root',
    data: {
        keywords: '',
        KEY: 'ffa2a5621d404c09942b8e5767b10bcc',
        articles: [],
        slickActivated: false
    },
    methods: {
        async getArticles() {
            event.preventDefault();
            this.articles = [];
            if (this.slickActivated) {
                $('.slidesArray').slick('unslick');
            }
            try {
                const response = await axios.get('http://newsapi.org/v2/top-headlines', {
                    params: {
                        q: this.keywords,
                        pageSize: 5,
                        apiKey: this.KEY
                    }
                })
                this.articles = response.data.articles;
            }
            catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                $('.slidesArray').slick({
                    prevArrow: "<button id='prevButton'></button>",
                    nextArrow: "<button id='nextButton'></button>"
                });
                this.slickActivated = true;
            }, 100);
        }
    }
})