'use strict';

function getGithubUser() {
		const username = document.getElementById('username').value;
    fetch('https://api.github.com/users/' + username + '/repos')
        .then(response => response.json())
        .then(responseJson => 
            displayResults(responseJson))
        .catch(error => error(responseJson));
}

function displayResults(responseJson) {
	const username = document.getElementById('username').value;
	$('.results').empty();
	//display the results section
  if (responseJson.status === 'error'){
    console.log("whoops, got a " + responseJson.code)
  } else {
		$('.results').prepend(`<h3>${username}'s repos</h3>`).append(`<ul class="list"></ul>`).removeClass('hidden')
		for (let i = 0; i < responseJson.length; i++){
			$('.list').append(`<li><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></li>`)
			console.log(responseJson[i].name);
		};
		// $('.results').append(`<h1>${responseJson[3].name}</h1>`)
		// console.log("this should work")
		// $.each(responseJson, function(index, name){
		//	$('.list').append(`<p>${responseJson[i].name}</p>`);
		//	console.log(responseJson[i].name);
		// })
  }
  }

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        console.log('clicked submit')
				getGithubUser();
    })
}

$(watchForm);