

let fillbar =document.querySelector(".fill") ; 

let audios = ["pesme/1.mp3","pesme/3.mp3","pesme/2.mp3"] ;
let slike = ["slike/slika1.jpg","slike/slika3.jpg","slike/slika2.jpg"] ; 
let imenaPesama=["I mean it","Evo stizem bebo","Psh Psh Psh"] ; 

let trenutnoVreme= document.querySelector(".time") ; 


//pravim  jedan audio objekat sto je u stvari
//samo html tag audio sa nekim src 

let audio = new Audio() ;  
let indexTrenutnePesme= 0 ; 

//kag god se ucita stranica treba da se pusti pesma automatski

/*window.onload = playSong() ; 

*/function playSong(){
    audio.src= audios[indexTrenutnePesme] ;
    audio.play() ;  
}

function togglePlayPause(){
    let playBtn= document.querySelector(".play-pause") ; 
    if(audio.paused){ //boolean
      
      audio.src= audios[indexTrenutnePesme] ;
      audio.play();

      playBtn.innerHTML=`<i class="fa fa-pause"></i>` ; 
      playBtn.style.paddingLeft= "30px" ;       
    }else  {
      audio.pause() ; 
     
      playBtn.innerHTML = `<i class="fa fa-play"></i>`
      playBtn.style.paddingLeft= "33px" ;
    }
}





//ovde sad fill bar ona linija 


//event timeupdate se opaljuje kada se promeni 
//playing position neke pesme ili snmika 
//ovaj event se obicno koristi sa currentTime property
//ona postavlja ili vraca trenutnu poziciju u sekundama
//od pesme ili snimka koji se pusta

//duration property vraca duzinu audija u sekundama

audio.addEventListener("timeupdate",() =>{
let pozicija=  audio.currentTime / audio.duration ; 
fillbar.style.width = `${pozicija*100}%` ; 


convertTime(Math.round(audio.currentTime)) ; 
//round zaokruzi na najblizi moguci broj jer da nam
//ne bi vracala 5.5 sekundi ili 10.01 ili tako nesto

ukupnoVreme(Math.round(audio.duration)) ; 

//ovo je da se automatski pusti sledeca pesma ako se zavrsila prethonda
if(audio.ended){
    sledecaPesma() ; 
}

}) ; 







function convertTime(seconds){
    //ako npr imamo 120 sekundi to kad podelimo sa 60
    //dobicemo minute i to je 2 minuta
    // a ako ima npr 124 sekunde onda ponovo treba 
    //da kad podelimo sa 60 bude 2 minuta ne 2 zarez
    //nesto i zato koritimo floor koji uvek zaokruzuje
    //na manje npr ako je 2.90 floor ce da zaokrzuzi na2
    //a to nama i treba jer kad ispisujemo minute pa sek
    //nama treba npr drugi minut i onda 50 sekundi 
    // i da ispise 3. minut tek kad predje 60 sek iz 2.
    let min = Math.floor(seconds/60) ; 
    
    //sekunde dobijamo tako sto od ukupnih sek
    //uradio mod od njih npr ako imamo 124 sekunde
    //ukupno nama 124%60 ce dati 4 sec sto nam i treba
    //jer trebamo da ispisemo gore prvo 2 minuta 
    //i onda dole jos 4 sekunde 

    let sec = seconds%60 ; 


    // da bi stavio da budu npr ako je 7 sekundi da ne
    //pise samo 7 nego 07 i sve tako 08 09 sve dok ne 
    //dodje do dvocifrenog 10 koristicu  : ? 
    // znaci ako je manje od 10 dodaj nulu ako je vece onda ostavi isto kako je 

    min = min<10 ? "0"+min: min ;  
    sec = sec<10 ? "0"+sec: sec ; 

    trenutnoVreme.textContent=`${min}:${sec}` ; 
}




//sad ukupno vreme koliko traje pesma pored 

function ukupnoVreme(seconds){

let min= Math.floor(seconds/60) ; 

let sec = seconds%60 ; 

min= min<10? "0"+ min: min ; 
sec= sec<10? "0"+ sec: sec ; 

//moram trenutno vreme plus trenutno vreme da bi 
//mi pisalo i ono vreme od pre to jesto ono vreme
//od trajanja pesme plus ovo ukupno koliko traje pesma

trenutnoVreme.textContent=
 trenutnoVreme.textContent+ " od " + min +":"+ sec ; 


}





 function sledecaPesma(){

    ++indexTrenutnePesme;  
    if(indexTrenutnePesme>2){
        indexTrenutnePesme=0 ; //vrati na prvu pesmu kad prodju 3 jer ih ukupno ima 3 i onda u krug
    }
    
    let slicice=document.querySelector("#slikee") ; 
    slicice.src= slike[indexTrenutnePesme] ;  
    
    let naslovi =document.querySelector(".title h1");  
    naslovi.textContent=imenaPesama[indexTrenutnePesme] ; 

    audio.src= audios[indexTrenutnePesme] ;
    audio.play() ;  
 }




 function proslaPesma(){
  --indexTrenutnePesme ;  
    if(indexTrenutnePesme<0){
      indexTrenutnePesme = 2 ; 
     }

   
  let slicice=document.querySelector("#slikee") ; 
  slicice.src= slike[indexTrenutnePesme] ;  

  let naslovi =document.querySelector(".title h1");  
  naslovi.textContent=imenaPesama[indexTrenutnePesme] ; 

  audio.src= audios[indexTrenutnePesme] ;
  audio.play() ;  


 }




 //sad smanjivanje i pojavavanje tona
// properti volume koja postavlja jacinu zvuka na audiu ili videu
// ili moze da vrati koliko je jak zvuk
//ide od 0.0 do 1.0 i 1 je najjace 
//1 je po defaultu i to je kao 100%
// 0.5 je 50% zvuka 0.4 40% zvuka itd

 function smanjiTon(){
audio.volume-=0.25 ;  //svaki put kad se klikne smanji se za 25%zvuk

 }


 function povecajTon(){
    audio.volume+=0.25
 }

 


 //kad se pritisne zvucnik ikonica da se mutuje zvuk i da se ona pretvori u mute ikonicu

 let mute = document.querySelector(".volume-up") ; 
 mute.addEventListener("click", () =>{

    if(audio.volume>0){ //ako ima nekog zvuka kad pritisnem onda se mutuje
     audio.volume=0 ; 
     document.querySelector(".volume-up i").className = "fa fa-volume-mute" ; // i promeni se ikonica na mute
    }
    else {
        audio.volume= 1 ; //ako nema zvuka onda ga postavlja na max tj 1 
        document.querySelector(".volume-up i").className = "fa fa-volume-up" ; //i promeni se ikonica na zvucnik
    }

 }); 

 