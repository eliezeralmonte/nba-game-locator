var teamAEl = document.querySelector("#teamA");
var teamBEl = document.querySelector("#teamB");
var gameTime = document.querySelector("#countdown");
// var gameLocation = document.querySelector("");

$(document).ready(function () {

  // Function fetches from basketball api, console logs data, then calls displayTeamData function
  function getGameData() {
        fetch("https://api-basketball.p.rapidapi.com/games?h2h=134-145", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "a02badb577msh53c62c24f7e4112p157b9bjsne248c865880a",
                "x-rapidapi-host": "api-basketball.p.rapidapi.com"
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        displayTeamData(data);
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    // Function displays all team data - name, logo, etc
    function displayTeamData(data) {

        // TEAM NAMES
        var teamAName = data.response[14].teams.away.name;
        var teamBName = data.response[14].teams.home.name;

        // Creates span for titles with team names, the append to HTML EL
        var teamATitle = document.createElement('span');
        teamATitle.textContent = teamAName;

        var teamBTitle = document.createElement('span');
        teamBTitle.textContent = teamBName;

        teamAEl.appendChild(teamATitle);
        teamBEl.appendChild(teamBTitle);

        // TEAM LOGOS
        var teamALogo = data.response[14].teams.away.logo;
        var teamBLogo = data.response[14].teams.home.logo;

        var logoA = document.createElement("img");
        logoA.setAttribute("src", teamALogo);
        logoA.setAttribute("height", "120px");
        logoA.setAttribute("width", "200px");
        logoA.setAttribute("padding-top", "135px");
        logoA.setAttribute("alt", "Team Logo");
        document.getElementById("teamA").appendChild(logoA);

        var logoB = document.createElement("img");
        logoB.setAttribute("src", teamBLogo);
        logoB.setAttribute("height", "120");
        logoB.setAttribute("width", "120");
        logoB.setAttribute("alt", "Team Logo");
        document.getElementById("teamB").appendChild(logoB);
    }


    getGameData();
  
  // GAME TIME
function gameCountdown() {
    var time = moment().format("dddd, MMMM Do h:mm a");
    gameTime.textContent = time;
};

    /* Ticketmaster API*/
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=nba&apikey=wkeUKU7nGwu8KaAr6CW0pqhy3LP5gh4f",
        async: true,
        dataType: "json",
        success: function (res) {
            console.log("**********",res);
            const eventData = res._embedded.events;
            //var futureGames = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');

            //initialize mark up string
            let nbaCardMarkUp = "";

            //concat markup stringthrough a loop
            for (let i = 0; i < eventData.length; i++) {
                nbaCardMarkUp += `
                    <div class="nba-card">
                        <h3 class="nba-title">${eventData[i].name}</h3>
                        <div class="nba-date-container">${eventData[i].dates.start.localDate} ${eventData[i].dates.start.localTime}</div>
                        <img class="nba-img" src="${eventData[i].images[0].url}"/>
                        <p class="nba-info">${eventData[i].info}</p>
                        <a href="${eventData[i].url}">Click Here to Visit Ticket Master</a>
                    </div>
                `;
            };

            //nba card add the page
            $("#map").html(nbaCardMarkUp);
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });
    

   
