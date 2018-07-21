const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Twitter = require('twitter-node-client').Twitter;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/:user/:num', function(req, res, next) {


    //Callback functions
    let error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };


    let successU = function (data) {


        let dta = JSON.parse(data);


        names[uCnt][3] = dta.profile_image_url;
        names[uCnt][4] = dta.location;


        augmentData(uCnt,names);

    };

    let uCnt = 0;
    let names = [['Lee Hackett',0,'leehackett_'],['Colin Day',0,'cday_uk'],['ANDY MULLINGS',0,'andymullings9'], ['Anton Roscoe Minnion',0,'antoniominnio'],['Urs Blickenstorfer',0,'ursblick'],['Neil Wilkes',0,'wilkesneil']];

    function augmentData(){


       console.log(uCnt,names.length);
        if(uCnt < names.length -1 ){
            uCnt ++;

            twitter.getUser({ screen_name: names[uCnt][2]}, error, successU);

        }else{

            res.render('index',{title: 'No. of @' + req.params.user + ' mentions in last ' + req.params.num + ' tweets', data: names});
        }



    };


    let success = function (data) {

        let body = JSON.parse(data);




        for (let c = 0; c < body.length; c++){

            let entities = body[c].entities.user_mentions;

            for (let n = 0; n < entities.length; n++){


                for( let i =0; i < names.length; i++){

                    if(entities[n].name == names[i][0]){
                        let count = names[i][1];
                        count++;
                        names[i][1] = count;


                    }

                }



            }



        }



        twitter.getUser({ screen_name: names[uCnt][2]}, error, successU);

    };



    let twitter = new Twitter( {
        consumerKey: "v9ReLP1iprzv9rp2NRENghDBK",
        consumerSecret: "kcLHVNLRjcNbXZkgquLXlG7S59qgP12IZ64vw2v9CGEAnERi85",
        accessToken: "23675507-ZK1TgcdUTgPDUe7YoUSvhZMOiT5BY8H8RsiqrPueS",
        accessTokenSecret: "G3byGiRhR6SKRHQ4wSKt6p3tVd4mO2byYugh3qVzsrshp",
        callBackUrl: "http://localhost:1978/datain"
    });

    //Example calls

    twitter.getUserTimeline({ screen_name: req.params.user, count: req.params.num}, error, success);



});

module.exports = router;
