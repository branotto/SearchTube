const YOUTUBE_SEARCH_URL = 'www.something.com';



//Displays the search results
function displayYouTubeSearchData(){
	console.log('displaying results ... soon');
}


//Requests data using the YouTube Search API
function queryDataFromAPI(searchTerm, callback){
	console.log('searching for ${searchTerm}');

	const query = {
		q:`${searchTerm}`
	}

	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


//Search button listener
function handleSearchRequest()
{
	console.log("listening for form submit");

	$('.js-search').on('submit', function(event){
		event.preventDefault();
		console.log('search pressed');

		const queryObject = $(event.currentTarget).find('.js-query');
		const queryValue = queryObject.val();

		queryObject.val("");

		queryDataFromAPI(queryValue, displayYouTubeSearchData());
	});

}


//Main Callback function
function handleCallbacks()
{
	//console.log("handleCallbacks ran");

	handleSearchRequest();
}


$(handleCallbacks)