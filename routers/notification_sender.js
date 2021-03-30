//ONE_SINGAL_APPID
const axios = require('axios');
const appid=process.env.ONE_SINGAL_APPID;
SendNotification=(playerid,sender,message)=>{
    axios
    .post(' https://onesignal.com/api/v1/notifications', {
        app_id:appid ,
        include_player_ids: [playerid],
        data: {"foo": "heyyy"},
        contents: {"en":sender+":   "+message},
        headings:{"en":"BlueChat"}
    })
    .then(res => {
      //console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch(error => {
      console.error(error)
      console.log("errrrr");
    })

}

module.exports.SendNotification=SendNotification;


