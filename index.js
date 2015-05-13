var express = require('express')
   , cors = require('cors');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(cors());

// hardcoded data
var myPeoples = {"peoples" : [ {"name" : "Ian Welch", "id" : "0"}, {"name" : "Aaron Chen", "id" : "1"} ]};

// hardcoded data
var myStories = {"stories" : [ {"title" : "Pharrell-Williams interview", "id" : "0"},
                {"title" : "New York Times: Snowfall", "id" : "1"},
                {"title" : "Snowden NSA files surveillance revelations decoded", "id" : "2"}]};

// movies and audio only sources for the stories
var myMedia = []
// some media for pharrell
var pharrell_vid = []
pharrell_vid[0] ={ url : "http://covercdn.complex.com/custom/pharrell/vid/pharrellTop.mp4" }
myMedia[0] = pharrell_vid

// couple of entries for the new york story
var nytimes_vid = []
nytimes_vid[0] = { url : "http://video1.nytimes.com/video/2012/12/17/19224_1_avalanche-allure_wg_16x9_xl_bb_mm.mp4"}
nytimes_vid[1] = { url : "http://graphics8.nytimes.com/packages/video/multimedia/bundles/projects/2012/AvalancheDeploy/weather_new.mp4"}
myMedia[1] = nytimes_vid

// lots (this is only a sample) for the guardian story
var snowden_vid = []
snowden_vid[0] = {url: "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p5/p5-1.mp4"}
snowden_vid[1] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p5/p5-2.mp4"}
snowden_vid[2] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p5/p5-3.mp4"}
snowden_vid[3] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p5/p5-4.mp4"}
snowden_vid[4] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p6/p6-1.mp4"}
snowden_vid[5] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p6/p6-2.mp4"}
snowden_vid[6] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p6/p6-3.mp4"}
snowden_vid[7] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/video/p6/p6-4.mp4"}
myMedia[2] = snowden_vid

// static images sources for the stories
var myImages = [];
// lot for pharrell
var pharrell_img = []
pharrell_img[0] = { url : "http://cdn.covers.complex.com/assets/pharrell/desktop/img/intro/chair.jpg"}
pharrell_img[1] = { url : "http://cdn.covers.complex.com/assets/pharrell/desktop/img/scene1/console1.jpg"}
pharrell_img[1] = { url : "http://cdn.covers.complex.com/assets/pharrell/desktop/img/scene1/console2.jpg"}
pharrell_img[2] = { url : "http://cdn.covers.complex.com/assets/pharrell/desktop/img/scene5/handout.jpg"}
myImages[0] = pharrell_img
// nytimes
var nytimes_img = []
nytimes_img[0] = { url : "http://graphics8.nytimes.com/packages/images/multimedia/bundles/projects/2012/AvalancheDeploy/avalanche_crack.jpg"}
nytimes_img[1] = { url : "http://graphics8.nytimes.com/images/2012/12/17/sports/AVIE_Debris-slide-GX8I/AVIE_Debris-slide-GX8I-custom1-v3.jpg"}
nytimes_img[2] = { url : "http://graphics8.nytimes.com/images/2012/12/17/sports/AVIE_NightSki-slide-87OV/AVIE_NightSki-slide-87OV-custom2.jpg"}
nytimes_img[3] = { url : "http://graphics8.nytimes.com/images/2012/12/17/sports/AVIE_NightSki-slide-U5NK/AVIE_NightSki-slide-U5NK-jumbo.jpg"}
nytimes_img[4] = { url : "http://graphics8.nytimes.com/images/2012/12/17/sports/AVIE_Path-slide-I9US/AVIE_Path-slide-I9US-custom1.jpg"}
myImages[1] = nytimes_img
// snowden
var snowden_img = []
snowden_img[0] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded-extended/interactives/nsa-docs/img/Bullrun_Guide-1.png"}
snowden_img[1] = { url : "http://gia.guim.co.uk/2013/10/nsa-decoded/html/asset/img/intro/intro.jpg"}
myImages[2] = snowden_img

// text to accompany the story
var pharrell_txt = []
pharrell_txt[0] = { text : "In 2013, mystery is a rare quality."}
pharrell_txt[1] = { text : "Undermined by the privacy-obliterating nature of technology, pop culture is largely devoid of mystique, and the mystics have all left the buildingâ€”with the exception of Pharrell Williams. Exactly what makes Skateboard P tick is an open question. How is it that this seemingly ageless creative force has never been more in demand than he is right now, at age 40, newly married, with a five-year-old son to look after? We canâ€™t tell you. Nobody can. But everyone can tell you this: Whether youâ€™re trying to build out an album of undeniable hits, or a sartorial statement piece thatâ€™s guaranteed to fly off shelves, you want Pharrell (and whatever it is that makes him tick) involved. Maybe heâ€™s simply built differently. After all, this is a guy who claims to have synesthesia, a neurological condition that allows him to see sounds as colors. Is it all about his brain wiring? Or perhapsâ€”as the extraterrestrial themes in his branding (The Neptunes production team, the Star Trak label, the Billionaire Boys Club astronaut logo) would suggestâ€”something not of this Earth?"}
pharrell_txt[2] = { text : "When I first met with Pharrell in early June, he was in SoHo, doing press for the 10th anniversary of his Billionaire Boys Club/Icecream brand, a line thatâ€™s provided the cool-guy uniform for everyone from forward-thinking style students to Jay Z. A parade of reporters and cameramen moved in waves through the spaceship-meets-ice-cream-shop-themed retail store, and dressed in cutoff denim shorts, a green army jacket, and a Comme des GarÃ§ons tee, Pharrell dabbed away the excess oil from his pizza. After conducting back-to-back interviews in the back office for a few hours, he told his publicist he wanted to switch up the energy and field Complexâ€™s questions outside. Coming from someone else, this might seem a fussy demand from a high-maintenance artist. Coming from Pharrell, itâ€™s assumed that his attention to tiny details will lead to something better. Call it instinct, or just a whimâ€”Pharrellâ€™s impulses arenâ€™t something you parse or ponder. Just trust it. In other words: When a mystic talks, you listen. So we did, settling in on a West Broadway stoop across from the store, trying our best to crack the Pharrell Williams code. Easier said than done."}

var nytimes_txt = []
nytimes_txt[0] = { text : "The snow burst through the trees with no warning but a last-second whoosh of sound, a two-story wall of white and Chris Rudolphâ€™s piercing cry: â€œAvalanche! Elyse!â€"}
nytimes_txt[1] = { text : "The very thing the 16 skiers and snowboarders had sought â€” fresh, soft snow â€” instantly became the enemy. Somewhere above, a pristine meadow cracked in the shape of a lightning bolt, slicing a slab nearly 200 feet across and 3 feet deep. Gravity did the rest."}
nytimes_txt[2] = { text : "Snow shattered and spilled down the slope. Within seconds, the avalanche was the size of more than a thousand cars barreling down the mountain and weighed millions of pounds. Moving about 7o miles per hour, it crashed through the sturdy old-growth trees, snapping their limbs and shredding bark from their trunks."}
nytimes_txt[3] = { text : "The avalanche, in Washingtonâ€™s Cascades in February, slid past some trees and rocks, like ocean swells around a shipâ€™s prow. Others it captured and added to its violent load."}
nytimes_txt[4] = { text : "Somewhere inside, it also carried people. How many, no one knew."}

var snowden_txt = []
snowden_txt[0] = { text : "When Edward Snowden met journalists in his cramped room in Hong Kong's Mira hotel in June, his mission was ambitious. Amid the clutter of laundry, meal trays and his four laptops, he wanted to start a debate about mass surveillance."}
snowden_txt[1] = { text : "He succeeded beyond anything the journalists or Snowden himself ever imagined. His disclosures about the NSA resonated with Americans from day one. But they also exploded round the world."}
snowden_txt[2] = { text : "For some, like Congresswoman Zoe Lofgren, it is a vitally important issue, one of the biggest of our time: nothing less than the defence of democracy in the digital age."}

var myText = []
myText[0] = pharrell_txt
myText[1] = nytimes_txt
myText[2] = snowden_txt


// nuber of stories

// how many people are there?
app.get('/v1/peoples/count', function(request, response) {
    response.send({ count : myPeoples.peoples.length });
});

// an example of extracting a parameter from a URI request
app.get('/v1/peoples/:name/hello', function(request, response) {
    response.send("Hello " + request.params.name);
});

// we can also return errors, lets do it every time
app.get('/v1/peoples/error', function(request, response) {
    response.status(404).send({ error : "Let's return an error"});
});

//Returns a list of stories,
app.get('/v1/stories', function(request, response) {
    response.send(myStories);
});

//Returns a count of stories,
app.get('/v1/stories/count', function(request, response) {
    response.send({ count : myStories.stories.length});
});

//Returns a list of text objects that make up the story
//specified using the id​variable
app.get('/v1/story/:id/text/all', function(request, response) {
	if(myText[request.params.id] === undefined || myText[request.params.id] === null){
		response.status(404).send({ error : "Error with ID"});
	}
	else{
		response.send( myText[request.params.id] );
	}
});

//Returns a list of URLs pointing to images that are
//associated with the story specified using the id
//variable.
app.get('/v1/story/:id/image/all', function(request, response) {
	if(myImages[request.params.id] === undefined || myImages[request.params.id] === null){
		response.status(404).send({ error : "Error with ID"});
	}
	else{
		response.send( myImages[request.params.id] );
	}
});

//Returns a list of URLs pointing to multimedia
//assets that are associated with the story specified
//using the id​variable.
app.get('/v1/story/:id/multimedia/all', function(request, response) {
	if(myMedia[request.params.id] === undefined || myMedia[request.params.id] === null){
		response.status(404).send({ error : "Error with ID"});
	}
	else{
		response.send( myMedia[request.params.id] );
	}
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});