new Vue({
    el: '#root',
    data: {
        keywords: '',
        KEY: 'ffa2a5621d404c09942b8e5767b10bcc',
        articles: []
    },
    methods: {
        async getArticles() {
            event.preventDefault();
            this.articles = [];
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
            }, 100);
        }
    }
})