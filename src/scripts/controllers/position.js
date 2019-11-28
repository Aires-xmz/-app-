const positionView = require('../views/position.art');
const positionModel = require('../models/position');
const {http} = require('../utils/http')
// import BScroll from 'better-scroll';
class Position {
    async render(titleLi) {
        
        let result = await http({
            type:'post',
            url:"/api/mhome",
            data:{

            }
        })
        let res = result.data.data
        let arrP = this.arrSort(res.scale.dstAndAirlinePriceInfo);
        arrP = arrP.slice(0, 3);
        let arrhotDest = res.hotDest.slice(0,4);
        let html = positionView({
            listBanner: res.slider.list,
            list: arrhotDest,
            scaleTitle: res.scale,
            listScale: arrP
        });
        $('main').html(html);
        this.positionTitleRender(titleLi)
        positionModel.slide();
        $('.reserve').on('tap', positionModel.changeHash);
        $('.seat').on('tap', positionModel.changeHash);
        $('.loginIn').on('tap', positionModel.changeHash);
        $('.message').on('tap', positionModel.changeHash);
        $('.more-scale').on('tap',positionModel.changeHash);
        $('.more-des').on('tap',positionModel.changeHash);
    }
    arrSort(arr) {
        let arrPrice = arr.sort(function (n1, n2) {
            return n1.airlinePriceInfo.lowestPrice - n2.airlinePriceInfo.lowestPrice;
        })
        return arrPrice;
    }
    positionTitleRender(titleLi) {
        let isSignin = JSON.parse(localStorage.getItem('status'))
        if(isSignin){
            titleLi.eq(0).html(``);
        }else{
            titleLi.eq(0).html(`<span class="loginIn" data-to="login">&#xe657;</span><span class="login loginIn" data-to="login">登录</span>`);
        }
        titleLi.eq(1).html('&#xe663;').addClass('font-position').removeClass('font-fly');
        titleLi.eq(2).html('<span class="message" data-to="message">&#xe69b;</span>');
        $('footer').show();
    }

}

// module.exports = Position;
export default new Position();