const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


//Render each item
function renderResult(item)
{
	return 
	`<li>
		<img>	
	</li>
	`
}


//Displays the search results
function displayYouTubeSearchData(response){
	// const results = data.items.map((item, index) => renderResult(item));
	
	
	//console.log(response.items["0"].snippet.thumbnails.high);
}


//Requests data using the YouTube Search API
function queryDataFromAPI(searchTerm, callback){
	console.log(`searching for ${searchTerm}`);

	const query = {
                'part': 'snippet',
                'q': searchTerm,
                'key': API_KEY
            };

	($.getJSON(YOUTUBE_SEARCH_URL, query, callback));
}


//Search button listener
function handleSearchRequest()
{

	$('.js-search').on('submit', function(event){
		event.preventDefault();

		const queryObject = $(event.currentTarget).find('.js-query');
		const queryValue = queryObject.val();

		queryObject.val("");

		queryDataFromAPI(queryValue, displayYouTubeSearchData());
	});

}


//Main Callback function
function handleCallbacks()
{

	handleSearchRequest();
}


$(handleCallbacks)