const adress_router = require('./adress.routes');
const steak_router=require('./steak.routes');
/*const social_router=require('./social.routes');*/
const social_router=require('./social.routes');
const router = {
    adress: adress_router,
    steak:steak_router,
    /*social:social_router,*/
    social:social_router
}

module.exports = router

