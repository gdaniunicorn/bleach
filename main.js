//set the max height of the cards div
var cards = document.getElementById("cards");
cards.style.maxHeight = window.innerHeight - cards.getBoundingClientRect().top - 10 + "px";

//fetch function
function loadFile(file,func){
    fetch(file)
      .then((res) => res.text())
      .then(function(text){
        var lines = text.trim().split("\n");
        var headers = lines[0].split(',');

        var d = [];

        for(let i=1;i<lines.length;i++){
            var dict = {};
            var datas = lines[i].split(',');

            for(let j=0;j<datas.length;j++){
                dict[headers[j].trim()] = datas[j].trim();
            }

            d.push(dict);
        }
        //console.log(data);
        
        func(d);
      })
      .catch((e) => console.error(e));
}



//start the game
  document.onload = loadFile("characters.txt",main)


/**
 *  -- MAIN FUNCTION -- 
 * @param {Array} file 
 */
function main(file){

    var data = undefined;

  // retry \\
    document.getElementById("retry").addEventListener("click",function(){
        document.getElementById("cards").innerHTML = "";
        document.getElementById("guess").value = "";
        game();
    })

  // VARIABLES \\
    var input = document.getElementById("guess");
    var guesschar = undefined;
    var sol=undefined;
    var j = document.getElementById("j"); //javaslatok


  // define eventlistener handlers \\
    function send(){
        if(input.value.trim()!=="" && j.children.length>0){
            guesschar=j.children[0].id;
            guess();
        }
    }
    function onkeyup(e){
        if(e.key=="Enter" && input.value.trim()!=="" && j.children.length>0){
            guesschar = j.children[0].id;
            guess();
        }
    }
    function onclick(e){
        let card = e.target.closest(".card-j");
            if (card){
            guesschar = card.id;
            guess();
        }
    }

  // EVENT LISTENERS \\
    input.addEventListener("input",oninput);
    document.getElementById("send").addEventListener("click",send)
    document.addEventListener("keyup",onkeyup)
    j.addEventListener("click",onclick)





  //  --INPUT FUNCTION--  \\
    function oninput(){
        if(input.value.trim()!==""){
            console.log(data);
            
            var chars = data.filter(c => c.sname.toLowerCase().includes(input.value.toLowerCase()));  //available characters
            j.innerHTML = chars.map(c => 
            `<div class="card-j" id="${c.code}">
                <div class="j-img" style="background-image:url(pics/${c.code}.webp);"></div>
                <div class="j-name">${c.name}</div>
                </div>`).join("");
            // |^ javaslatok hozzáadása
            j.style.display = "flex";
        }else{
            //javaslatok eltüntetése
            j.innerHTML = "";
            j.style.display = "none";
        }
    }

  //  --GUESS FUNCTION--  \\
    function guess(){
        var out = document.getElementById("cards")
        var char = data.find(c => c.code === guesschar)
        if(!char){console.error("Character not found:", guesschar);return;}
        out.innerHTML = `
        <div class="card">
            <div class="card-attr card-img" style="background-image:url(pics/${char.code}.webp);"></div>
            <div class="card-name card-attr ${char.name==sol.name ? 'correct':'incorrect'}">${char.name}</div>
            <div class="card-attr card-gender ${char.gender==sol.gender ? 'correct':'incorrect'}">${char.gender}</div>
            <div class="card-attr card-race ${char.race==sol.race ? 'correct':'incorrect'}">${char.race}</div>
            <div class="card-attr card-age ${char.age==sol.age ? 'correct':'incorrect'}">${char.age} <div class="index up"></div> </div>
            <div class="card-attr card-height ${char.height==sol.height ? 'correct':'incorrect'}">${char.height} <div class="index down"></div></div>
            <div class="card-attr card-hair ${char.hair==sol.hair ? 'correct':'incorrect'}">${char.hair}</div>
            <div class="card-attr card-location ${char.location==sol.location ? 'correct':'incorrect'}">${char.location}</div>
            <div class="card-attr card-arc ${char.arc==sol.arc ? 'correct':'incorrect'}">${char.arc}</div>
        </div>` + out.innerHTML
    //|^ add char datas
    // remove guessed char
        if(char.code !== sol.code){
            data.splice(data.findIndex(c => c.code === guesschar),1);
            input.value="";
            j.style.display = "none";
        }else{
            window.alert("Kitaláltad!!!");
        }
    }

  // WIN FUNCTION \\
    function win(){
    }  



  // -- MAIN GAME FUNCTION --
    function game(){
      // setup
        data = file.slice();
        console.log(data,file);
        
      // generate the solution character
        var rand = Math.floor(Math.random()*(data.length-1))
        while (rand == localStorage.getItem("last")){
            rand = Math.floor(Math.random()*(data.length-1))
        }
        sol = data[rand]
        console.log(sol);
        localStorage.setItem("last", rand);
    }

  // START THE GAME \\
    game();
}