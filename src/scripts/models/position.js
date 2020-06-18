require('../../libs/jquery-3.4.1.min');
const Swiper = require('../../libs/swiper');
const BScroll = require('better-scroll');
module.exports = {
    changeHash(){
        location.hash = $(this).attr('data-to');
    },
    slide(){
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
            loop:true,
            pagination: {
                el: '.swiper-pagination',
            },
        })
        //main better-scroll
        let bscrollMain = new BScroll.default('main',{
            probeType:2,
            bounce: false
        });
        //旅行信息
        let travel = document.getElementsByClassName('travel-menu');
        let bscrollTravel = new BScroll.default(travel[0],{
            scrollX:true,
            scrollY:false,
            scrollbar:true,
            probeType:2,
            bounce: false
        });
        //热门城市
        let hotCity = document.getElementsByClassName('hot-city');
        let bscroll = new BScroll.default(hotCity[0],{
            scrollX:true,
            scrollY:false,
            scrollbar:true,
            probeType:2,
            bounce: false
        });
        //优惠从**启程
        let hbbl = document.getElementsByClassName('hna-book-benefit-list');
        let bscrollBenefit = new BScroll.default(hbbl[0],{
            scrollX:true,
            scrollY:false,
            scrollbar:true,
            probeType:2,
            bounce: false
        });
    }
}