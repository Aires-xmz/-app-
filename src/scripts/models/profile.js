const BScroll = require('better-scroll');
module.exports = {
    slide(elem){
        let bscrollMain = new BScroll.default(elem,{
            probeType:2,
            bounce: false
        });
    }
}