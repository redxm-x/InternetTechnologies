var express = require('express');
var router = express.Router();

const koszt_zasiewu = 1;
const max_prod = 20;
const przyrost = 4

let ostatni = null

let bogactwo = 2;
    
class zasiew {
    constructor(date){
        this.date = date
        this.bog = 0;
    }
        
}

var farma = [];


router.get('/', function(req, res, next) {
    res.send('koszt zaisiewu: '+ koszt_zasiewu +'<br></br>'+
   'limit produkcji jednego zasiewu: ' +max_prod +'<br></br>'+
   'przyrost: '+ przyrost + 'na minute'+'<br></br>'+
   'Bogactwo: '+bogactwo )
    
});

router.get('/zasiej', function(req, res, next) {
    

    if (bogactwo >0 ){
        let datatime = new Date()
        ostatni = datatime
        farma.push(new zasiew(datatime))
        res.send('akcja zasiewu')
        bogactwo -= koszt_zasiewu
    }
    else{
        res.send('akcja zasiewu nieudana')
    }
    
});

function diff_minutes(dt2, dt1){
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));  
}

  


router.get('/status', function(req, res, next) {    

    if (farma.length <=0 ){
        res.send('Brak aktywnego zasiewu')
    }
    else{
        let ilosc_wyprodukowana = 0;
        
        let datatime = new Date()
        for (let i of farma) {
            if( diff_minutes( i.date, datatime) > 0 )
            {
                              
               i.bog = diff_minutes(i.date, datatime)*przyrost
               if(i.bog > 20){
                   i.bog = 20
               }
                
                ilosc_wyprodukowana+= i.bog
                
            }
        }

        res.send('ilość aktywnych farm: '+ farma.length + '<br></br>'+
        'ilość wyprodukowanych dóbr: '+ ilosc_wyprodukowana );
    }
    ilosc_wyprodukowana = 0;
    
    
});

router.get('/zbierzwszystko', function(req, res, next) {    

    if (farma.length <=0 ){
        res.send('Brak aktywnego zasiewu, nie można zebrać')
    }
    else{
        let ilosc_wyprodukowana = 0;
        
        let datatime = new Date()
        for (let i of farma) {
            if( diff_minutes( i.date, datatime) > 0 )
            {
                              
               i.bog = diff_minutes(i.date, datatime)*przyrost
               if(i.bog > 20){
                   i.bog = 20
               }
                
                
                bogactwo+= i.bog
                
            }
        }
        farma = []

        res.send('Bogactwo po zebraniu: '+ bogactwo );
    }
    ilosc_wyprodukowana = 0;
    
    
});

router.get('/zbierzpelne', function(req, res, next) {    

    if (farma.length <=0 ){
        res.send('Brak aktywnego zasiewu, nie można zebrać')
    }
    else{
        let elo = ""
        let datatime = new Date()
        for (let i of farma) {
            if( diff_minutes( i.date, datatime) > 0 )
            {
                              
               i.bog = diff_minutes(i.date, datatime)*przyrost
               if(i.bog >= 20){
                   i.bog = 20
                   bogactwo+=i.bog
               }
               else{
                    elo = 'brak pelnego zaisewu'
               }
                
                
                
                
            }
        }
        
        farma = farma.filter(item => item.bog !== 20)


        res.send('Bogactwo po zebraniu: '+ bogactwo+ elo );
        elo =""
    }

    
    
});

module.exports = router;


