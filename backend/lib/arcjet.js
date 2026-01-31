import arcjet, {tokenBucket,shield, detectBot} from "@arcjet/node";

import dotenv from "dotenv";
//initlize the arcjet environment variables

export const aj = arcjet({ 
  key:process.env.ARCJET_KEY,
  characteristics:["ip.src"],
  rules:[
    shield({
        //shield protects your server from common attacks ex    SQL INJECTION,XSS,CSRF, attacks
         mode:"DRY_RUN", }),
         detectBot({
            mode:"DRY_RUN",
            // block all the bots expect search engines
            allow:[
                "CATEGORY:SEARCH_ENGINE",
                //SEE THE FULL LIST AT https://docs.arcjet.com/features/detect-bot
            ]
         }),
         //rete limiting
        

         tokenBucket({
            mode:"DRY_RUN",
            refillRate: 5,
            //allow 10 requests per minute
            interval:10,
            capacity:10,
            penaltyBoxDuration:300,
            //penalty box duration in seconds
            
          })
  ]


})