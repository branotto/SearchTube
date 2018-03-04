"use strict"

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


//Add button for displaying the previous and next page of results
function addResultButtons(){

	const addButtons = 
	`
	<button type="button" class="prev">Previous</button>
	<button type="button" class="next">Next</button>
	`

	$('.js-button-container').html(addButtons);

	//TODO - ADD LISTENER TO BUTTONS AND DISPLAY THE RESULTS ACCORDINGLY
}


//Render each item
function renderResult(items)
{
	let results = "";

	for( let i = 0; i < items.length; i++)
	{
		results += 
		`<li class='col-4 panel'>
			<a href="http://www.youtube.com/watch?v=${items[i].videoID}" title="Visit YouTube to watch ${items[i].title}.">
			<img src=${items[i].thumbnailURL} alt=${items[i].title}>
			</a>
			<p>${items[i].title}</p>
		</li>
		`
	}


	$('.js-results').html(results);
}


//Requests data using the YouTube Search API
function queryDataFromAPI(searchTerm, callback){
	const query = {
                'part': 'snippet',
                'q': searchTerm,
                'key': API_KEY
            };

	($.getJSON(YOUTUBE_SEARCH_URL, query, function(data){
		
		const response = data;
		
		let responseCount = response.items.length;

		let nextPage = response.nextPageToken;

		let items = [];

		for(let i = 0; i < responseCount; i++)
		{
			let item = {
				title : response.items[i].snippet.title,

				thumbnailURL : response.items[i].snippet.thumbnails.medium.url,

				videoID : response.items[i].id.videoId

			}

			items.push(item);
		
		}

		renderResult(items);
		addResultButtons();
	}));
}


//Displays the search results
function displayYouTubeSearchData(response){
	// const results = data.items.map((item, index) => renderResult(item));
	
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