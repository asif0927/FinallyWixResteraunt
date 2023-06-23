const adress_router = require('./adress.routes');
const steak_router=require('./steak.routes');
const social_router=require('./social.routes');
const worktime_router = require('./worktime.routes');
const gif_router=require('./gif.routes');
const gallery_router=require('./galery.routes');
const logo_router=require('./logo.routes');
const service_router=require('./service.routes');
const subscriber_router=require('./subscribe.routes');
const router = {
    adress: adress_router,
    steak:steak_router,
    social:social_router,
    worktime : worktime_router,
    gif:gif_router,
    gallery:gallery_router,
    logo:logo_router,
    service:service_router,
    subscriber:subscriber_router,
}

module.exports = router

