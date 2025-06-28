//Todas las importaciones de los elemento de html
/**
 * la variable que se llama draw_timing es la pocion,
 * y realmente fue un descarte de idea,
 * ya que iba a ser el parry
 */
let draw_timing = document.getElementById("heal");
const enemy = document.getElementById("fight");
const game_container = document.getElementById("game-container");
const one_screen = document.getElementById("button");
const instructions = document.getElementById("Instructions");
const list_player = document.getElementById("list_player");
const abyss = document.querySelector(".personaje");
const nameless = document.querySelector(".Rey")
const knight = document.querySelector(".Gael");
const btn = document.getElementById("action");
const begin = document.getElementById("begin");
const display = document.getElementById("display");
const button_start=document.querySelector(".start");
let img = document.createElement("img");
let hp_player = document.getElementById("player");
let hp_villain = document.getElementById("enemigo");
let player_combat = document.getElementById("player_combat");
let preparing = document.getElementById("starting");
let skill = document.getElementById("skill");
let reset = document.querySelector(".reset");
let final = document.getElementById("final");
let win_or_lose = document.getElementById("win_or_lose");
let final_reset = document.querySelector(".final_reset");
//sound
let kill = new Audio("src/audio/Kill.wav");
let curar = new Audio("src/audio/Estus.wav");
let skill_sound = new Audio("src/audio/Skill.mp3");
let fight = new Audio("src/audio/Fight.ogg");
//sound precarga
fight.preload;
fight.volume = 0.5;
kill.preload = "auto";
curar.preload = "auto";
skill_sound.preload = "auto";
//Eventos(todos son el mismo evento XD)
one_screen.addEventListener("click", firtsStart);
abyss.addEventListener("click",personajes);
nameless.addEventListener("click",personajes);
knight.addEventListener("click",personajes);
enemy.addEventListener("click",Accion);
draw_timing.addEventListener("click",healing);
button_start.addEventListener("click",start);
skill.addEventListener("click",Player_skill)
reset.addEventListener("click",recargar);
final_reset.addEventListener("click",recargar);

let count = 0;
let pj = ["src/sprite/Hermana_friede/Friede.webp","src/sprite/Gael/Gael.webp","src/sprite/Rey_Sin_nombre/King.webp"];
//Estadisticas del  jugador y sus personajes,y estadisticas del enemigo
let player = {
personaje : ["Hermana Friede","Gael","Rey Sin Nombre"],
vida : 10,
ataque : 2,
}
let enemigo = {
vida : 50,
ataque : 2,
}
let potions = 5;
let potions_count = 0;
//Sirve para dar la pantalla final,para saber si ganaste o perdiste
function last (){
    display.style.display = "none";
    if(enemigo.vida <= 0){
    win_or_lose.innerHTML= "<h4>"+"Ganaste quieres volver al inicio para volver a jugar?"+"</h4>"
    }
    else if (player.vida <= 0){
        win_or_lose.innerHTML= "<h4>"+"Perdiste quieres volver a intentarlo?"+"</h4>"
    }
    final.style.display = "grid";
}
//Precarga XDD
function recargar(){
    location.reload(false);
}
//Funcion para que el jugador ataque,cure o use su habilidad
function Accion(){
    enemigo_hp();
    kill.play(1000);
    setTimeout(()=>{
    kill.pause();
    kill.currentTime = 0;
    },1000)
    enemigo.vida -= player.ataque;
    if (enemigo.vida <= 0) {
        last();
    }
    if(enemigo.vida > 0){
        enemigoAtaca();
    }
}
function healing(){
    curar.play(2000);
    setTimeout(()=>{
        curar.pause();
        curar.currentTime = 0;
    },2000)
    player.vida += potions;
    potions_count++;
    enemigoAtaca();
}
function Player_skill(){
    enemigo_hp();
    skill_sound.play(3000);
    setTimeout(()=>{
        skill_sound.pause();
        skill_sound.currentTime = 0;
    },3000)
    if(enemigo.vida > 0){
        enemigo.vida -= player.ataque * 4;
        count = 0;
        enemigoAtaca();
    }
    hp_villain.innerHTML= "<h5>"+"HP:"+ enemigo.vida +"</h5>"
}
//Ia del enemigo(el rng es una mierda JAKJAKJ)
function enemigoAtaca() {
    player_hp();
    let XD = random_start(1,6);
    if (player.vida <= 0) {
        last();
    }
    else if (XD === 1||XD === 2||XD === 3 ||XD === 4 && enemigo.vida > 0) {
        player.vida -= enemigo.ataque;
    }
    else if(XD === 5){
        enemigo.vida += potions;
    } 
    if(count < 3){
        skill.disabled = true;
        count++;
    }
    else if(player.vida > 0){
        player_turn();
    }
    btn.style.display = "flex";   
    player_turn();
}
//Funcion para la animacion de la vida del enemigo y del jugador
function player_hp(){
    hp_player.classList.add("player_damage");
    hp_player.style.opacity = "100%";
    setTimeout(()=>{
    hp_player.classList.remove("player_damage");
    hp_player.innerHTML = "<h5>"+"HP:"+ player.vida +"</h5>"
    },1000)
}
function enemigo_hp(){
    hp_villain.classList.add("player_damage");
    hp_villain.style.opacity = "100%";
    setTimeout(()=>{
    hp_villain.classList.remove("player_damage");
    hp_villain.innerHTML = "<h5>"+"HP:"+ enemigo.vida +"</h5>"
    },1000)
}
//funcion que devuelve un numero random segun el min y el max que se aplique
function random_start(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random()* (max-min)+min)
}
//inicio aleatorio,puede empezar el turno del enemigo o el jugador
function startGame() {
    if(random_start(1,3) === 1){
        player_turn();
    }
    if(random_start(1,3) === 2){
        enemigoAtaca();
    }
}
function player_turn(){
if(potions_count === 5){
    draw_timing.disabled = "true"
}
if (player.vida <= 0) {
    last();
}
if(count >= 3){
    skill.disabled = false;
}
if (enemigo.vida <= 0) {
        last();
}

}
//Menu
function firtsStart() {
    one_screen.style.display = "none";
    instructions.style.display = "none";
    list_player.style.display = "flex";
    game_container.style.display = "none";
}
function personajes(){
    list_player.style.display = "none";
    btn.style.display = "flex";
    begin.style.display = "grid";
    starting.innerHTML="<h4>" + "Has elegido a " + player.personaje + ",Estas seguro que estas preparado?"  +"</h4>";
}
function start(){
    fight.play();
    img.src = pj;
    img.className = "style_img"
    begin.style.display= "none";
    display.style.display="grid";
    player_combat.appendChild(img);
    hp_player.innerHTML = "<h5>"+"HP:"+ player.vida +"</h5>"
    hp_villain.innerHTML= "<h5>"+"HP:"+ enemigo.vida +"</h5>"
    startGame();
}






