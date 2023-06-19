const adress_router = require('./adress.routes');
const steak_router=require('./steak.routes');
const social_router=require('./social.routes');
const worktime_router = require('./worktime.routes');
const gif_router=require('./gif.routes');
const router = {
    adress: adress_router,
    steak:steak_router,
    social:social_router,
    worktime : worktime_router,
    gif:gif_router
}

module.exports = router

