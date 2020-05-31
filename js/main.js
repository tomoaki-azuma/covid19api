


let vm = new Vue({
    el: '#app',
    data: {
        countries: [],
        selected: "",
        summary: {},
        global_summary: {},
        search_word: "",
        candidates: [],
        selected_country: [],
        selected_country_data: []
    },
    methods: {
        searchCountry: function() {
            this.candidates = this.countries.filter( function( value, index, array ) {
                return value['Country'].indexOf(this.search_word) >= 0 || value['Slug'].indexOf(this.search_word) >= 0;       
            }, this)
        },
        additem: function(value){
            console.log(value)
            if (!this.selected_country.includes(value)) {
                this.selected_country.push(value);
            }
            this.selected_country_data = this.getCountryData();
            this.search_word = ""
        },
        getCountryData: function() {
            temp = this.summary['Countries'].filter( function( value, index, array ) {
                return this.selected_country.indexOf(value['Slug']) >= 0;       
            }, this)

            let ret = []
            r = temp.length / 3;
            for (let i=0; i <= r; i++) {
                let colary = []
                for (let j=0; j < 3; j++) {
                    if (temp.length > i*3 + j) {
                        colary.push(temp[i*3 + j])
                    } else {
                        colary.push('')
                    }
                }
                ret.push(colary)
            }

            return ret
        },
        removeCountry: function(country) {
            this.selected_country = this.selected_country.filter( function(value) {
                return value != country
            }, country)
            this.selected_country_data = this.getCountryData();

        }
    },
    computed: {

    },
    created: function () {
        axios
            .get('https://api.covid19api.com/countries')
            .then(response => this.countries = response['data']);
        axios
            .get('https://api.covid19api.com/summary')
            .then(response => {
                this.summary = response['data'];
                this.global_summary = this.summary['Global']
            })
            .catch( function (error) {
                alert('Please reload this page')
            });
    }
})
