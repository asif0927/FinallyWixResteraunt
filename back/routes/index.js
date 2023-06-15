const adress_router = require('./adress.routes');
const steak_router=require('./steak.routes');
const router = {
    adress: adress_router,
    steak:steak_router
}

module.exports = router

