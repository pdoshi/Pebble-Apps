var UI = require('ui');
var ajax = require('ajax');
var title2;
var description;
var totalitems;

// Create card to fetch news highlights
var card = new UI.Card({
  title:'NYTimes Trending',
  subtitle:'Fetching....',
  scrollable: true,
  style: 'small'
});

// Display card
card.show();

// Construct URL
var myApiKey = '7b5d6fcee13c44589b363ba2f08d2afc';
var URL = 'https://api.nytimes.com/svc/topstories/v1/home.json?api-key=' + myApiKey;

//Make Request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    //Success!
    console.log("News fetching successful!");
    //var headline=main.section.title;
    //console.log(data);
    
    //Extract data
    totalitems = data.num_results;
    console.log(totalitems);
      for (i = 0; i<=totalitems; i++) {
      console.log(i);
      title2 = data.results[i].subsection;
      console.log(title2);
      description = data.results[i].title;
      console.log(totalitems);
      card.subtitle(title2);
      card.body(description);
      console.log(description);      
    }
  },
      
  //Error
  function(error) {
  console.log("Could not fetch news from url provided" + error);
  }
);

