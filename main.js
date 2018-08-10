"use strict"

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyD1ERIZONWPADkuHsZh8jkZ_bE5_ZT_X5o';


//Adds listeners to change the page results
function changePageResults(query, nextToken ){


	$('.js-next-button').on('click', function(event){
		event.preventDefault();

		query.pageToken = nextToken;
		//prevToken = nextToken;

		($.getJSON(YOUTUBE_SEARCH_URL, query, function(data){
		
			const response = data;
			parseResults(query, response);
			
		}));
	});

	
}


//Add button for displaying the previous and next page of results
function addResultButtons(){

	const addButtons =

	`
	<button type="button" class="js-next-button my_button">Next</button>
	`;

	$('.js-button-container').html(addButtons);

}




//Render each item
function renderResult(items)
{
	$('.js-results').html("");

	let results = "";

	for( let i = 0; i < items.length; i++)
	{
		results += 
		`<li class='col-4 panel item'>
			<a href="http://www.youtube.com/watch?v=${items[i].videoID}" title="Visit YouTube to watch ${items[i].title}.">
			<img src=${items[i].thumbnailURL} alt=${items[i].title}>
			</a>
			<p>${items[i].title}</p>
		</li>
		`
	}

	$('.js-results').html(results);
}

function displayResultCounts(responseCount, totalResponses){
	let resultCount = 
	`<p>Displaying ${responseCount} videos out of ${totalResponses} videos.</p>`

	$('.js-results-count-container').html(resultCount);
}

function parseResults(query, response){
	
	let responseCount = response.items.length;
	let totalResponses = response.pageInfo.totalResults;

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

	displayResultCounts(responseCount, totalResponses);
	renderResult(items);
	addResultButtons();
	changePageResults(query, nextPage);
}

//Requests data using the YouTube Search API
function queryDataFromAPI(searchTerm){
	const query = {
                'part': 'snippet',
                'q': searchTerm,
                'key': API_KEY
            };

	($.getJSON(YOUTUBE_SEARCH_URL, query, function(data){
		
		const response = data;
		
		parseResults(query, response);
		
	}));
}

//Search button listener
function handleSearchRequest()
{

	$('.js-search').on('submit', function(event){
		event.preventDefault();

		const queryObject = $(event.currentTarget).find('.js-query');
		const queryValue = queryObject.val();

		queryObject.val("");

		queryDataFromAPI(queryValue);
	});

}


//Main Callback function
function handleCallbacks()
{

	handleSearchRequest();
}


$(handleCallbacks)