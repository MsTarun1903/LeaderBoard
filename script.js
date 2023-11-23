let players = []; // Array to store players

const form = document.getElementById('scoreForm');
const leaderboard = document.getElementById('topScores');
const required = document.getElementById("required")
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const country = document.getElementById('country').value;
    const score = parseInt(document.getElementById('score').value);

   if(!firstName || !lastName|| !country||isNaN(score)){
    required.innerHTML = "Please enter all the fields";
    required.style.color = "red";
    required.style.fontSize = "20px";
    return;
   }else{
    required.innerHTML = "";
   }
    const player = {
        firstName,
        lastName,
        country,
        score
    };

    players.push(player);
    players.sort((a, b) => b.score - a.score);
    players = players.slice(0, 5); // Keep only top 5 players

    displayLeaderboard();
    form.reset();
});

function displayLeaderboard() {
    leaderboard.innerHTML = ''; 

    players.sort((a,b) => b.score - a.score);

    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('score-box');
        listItem.innerHTML = `<div><span class="firstName">${player.firstName}</span> <span class="lastName">${player.lastName}</span> <span class="time">${today()}</span></div> <span class="country">${player.country}</span> <span class="score">${player.score}</span> <button class="increment">+5</button> <button class="decrement">-5</button> <button class="Delete">Del</button>`;
        leaderboard.appendChild(listItem);

        listItem.querySelector(".increment").addEventListener("click",function(){
            player.score += 5;
            displayLeaderboard();
        });
        listItem.querySelector(".decrement").addEventListener("click",function(){
            player.score -= 5;
            displayLeaderboard();
        });
        listItem.querySelector(".Delete").addEventListener("click",function(){
            players.splice(index,1);
            displayLeaderboard();
        });
    });
}

function today(){
    let today = new Date();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[today.getMonth()];
    let date = today.getDate();
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    return `${month} ${date}, ${year} ${hours}:${minutes}`;
}
