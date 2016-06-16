var UI = require('ui');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var ajax = require('ajax');
var Vector2 = require('vector2');
var i;

var parsefeed = function(data, quantity) {
    var items = [];
    //var totalitems = data.num_results;
    //console.log(totalitems);
      for (i = 0; i < quantity; i++) {
      //console.log(i);
      //var title2 = data.results[i].section;
      var title2 = data.results[i].title;
      //console.log(title2);
      //var description = data.results[i].title;
      var description = data.results[i].abstract;
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
    text:'Fetching NYTimes Top Stories',
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
var myApiKey = '';
var URL = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + myApiKey;
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
    
    var menuItems = parsefeed(data,10);

    // Check the items are extracted OK
    for(i = 0; i < menuItems.length; i++) {
        console.log(menuItems[i].title + ' | ' + menuItems[i].subtitle);
      }
      
      // Construct Menu to show to user
        var resultsMenu = new UI.Menu({
          backgroundColor: 'White',
          textfont:'GOTHIC_14',
          highlightBackgroundColor: '#B6B6B4',
          highlightTextColor: 'black',
          sections: [{
            title: 'NYTimes Top Stories',
            items: menuItems
          }]
      });
      
    // Show the Menu, hide the splash
      resultsMenu.show();
      splashWindow.hide();
    
      // Add an action for SELECT
      resultsMenu.on('select', function(e) {
      //console.log('Item number ' + e.itemIndex + ' was pressed!');
      var content = menuItems[e.itemIndex].subtitle;  
        
      // Create the Card for detailed view
      var detailCard = new UI.Card({
      title:'Details',
      subtitleColor:'blue',
      scrollable: true,
      style: 'small',
      subtitle:e.item.title,
      body: content
      });
      detailCard.show();
    });
    
    // Register for 'tap' events
      resultsMenu.on('accelTap', function(e) {
      // Make another request to NYTimes.com
      ajax(
        {
          url: URL,
          type:'json'
        },
        function(data) {
          // Create an array of Menu items
          var newItems = parseFeed(data, 10);
          
          // Update the Menu's first section
          resultsMenu.items(0, newItems);
          
          // Notify the user
          Vibe.vibrate('short');
        },
        
        function(error) {
          console.log('Could not fetch news from url provided:' + error);
        }
        );
        });        
  },

  //Error
  function(error) {
    console.log('Could not fetch news from url provided:' + error);
  }
);
  
  // Prepare the accelerometer
  Accel.init();