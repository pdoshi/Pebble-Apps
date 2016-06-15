var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var i;

var parsefeed = function(data, quantity) {
    var items = [];
    //var totalitems = data.num_results;
    //console.log(totalitems);
      for (i = 0; i < quantity; i++) {
      //console.log(i);
      var title2 = data.results[i].section;
      //console.log(title2);
      var description = data.results[i].title;
      //console.log(totalitems);
      console.log(description); 
      
                // Add to menu items array
                items.push({
                  title:title2,
                  subtitle: description
                });
      }
//return whole array
return items;
};

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

//Text element to inform user
var text = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    text:'Fetching NYTimes Trending News...',
    font:'GOTHIC_14',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

// Construct URL
var myApiKey = '7b5d6fcee13c44589b363ba2f08d2afc';
var URL = 'https://api.nytimes.com/svc/topstories/v1/home.json?api-key=' + myApiKey;
console.log(URL);

//Make Request
ajax(
  {
    url:URL,
    type:'json'
  },
  
  function(data) {
    //Success!
    console.log("News fetching successful!");
    
    var menuItems = parsefeed(data,5);

    // Check the items are extracted OK
    for(i = 0; i < menuItems.length; i++) {
        console.log(menuItems[i].title + ' | ' + menuItems[i].subtitle);
      }
      
      // Construct Menu to show to user
        var resultsMenu = new UI.Menu({
          backgroundColor: 'WHITE',
          textColor: 'BLACK',
          textfont:'GOTHIC_14',
          highlightBackgroundColor: 'grey',
          highlightTextColor: 'black',
          sections: [{
            title: 'Trending News',
            items: menuItems
          }]
      });
      
    // Show the Menu, hide the splash
      resultsMenu.show();
      splashWindow.hide();
    
  },

  //Error
  function(error) {
  console.log("Could not fetch news from url provided" + error);
  });