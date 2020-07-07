const express = require("express");
const router = express.Router();
const uniqid = require('uniqid');

class posts {
    static incrementId() {
		if (!this.latestId) this.latestId = 1
		else this.latestId++
		return this.latestId
	  }
    constructor(author, mail, name, avk, footer, text){
        this.id = posts.incrementId();
        this.author = author;
        this.mail = mail;
        this.profID = uniqid();
        this.name = name;
        this.avk = awvk;
        this.footer = footer;
        this.text = text;
    }

}

var tab =[
    new posts('elo','mail@mail.com', 'elo','This is footer', 'This is not footer', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit.' ),
    new posts('elo','mail@mail.com', 'elo','This is not footer', 'This is footer', 'Lorem ipsum dolor sit amet, consectetur.' )
]

router.get("/",(req,res,next) =>
    res.json(tabO)

)

function abc (id) {
    for(let a in tab){
        if(tab[a].id == id){
            return tab[a]
        }


    }

}

router.get("/:id", (req, res) =>{
   console.log(req.params.id)
    res.json(abc(req.params.id))
    }
)



router.post("/", (req,res) => {
    tabO.push(new posts(req.body.author,req.body.mail, req.body.name, req.body.avk, req.body.footer, req.body.text))

})




module.exports= router;
