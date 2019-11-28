import morescaleView from '../views/morescale.art'
import morescalesortView from '../views/morescalesort.art'
import BSroll from 'better-scroll'
class Morescale {
    async render(titleLi) {
        let res = await this.get();
        let html = morescaleView({
            list: res
        })
        $('main').html(html)
        this.morescaleTitleRender(titleLi)
        new BSroll('.morescale-container',{
            scrollX:false,
            scrollY:true,
            bounce:false
        })
        $('.historyback').on('tap', this.back)
        $('.morescale-sort-down').on('tap', this.sortlist)
        $('.morescale-sort-up').on('tap', this.sortlist)
        $('.morescale-sort-select').on('tap', this.showsortby)
        $('.sortby-container').on('tap', this.sortby)
    }
    sortby(ev) {
        if (ev.target.className = 'sortby-item') {
            $.ajax({
                dataType: "json",
                type: 'get',
                url: '/libs/json/cityconfig.json',
                success: function (data) {
                    let res = data;
                    var fn;
                    if (ev.target.innerText == '按折扣排序') {
                        fn = function (n1, n2) {
                            return n1.airlinePriceInfo.lowestDiscount - n2.airlinePriceInfo.lowestDiscount;
                        }
                    } else if (ev.target.innerText = '按价格排序') {

                        fn = function (n1, n2) {
                            return n1.airlinePriceInfo.lowestPrice - n2.airlinePriceInfo.lowestPrice;
                        }
                    }
                    let arr = res.scale.dstAndAirlinePriceInfo.sort(fn);
                    let html = morescalesortView({
                        list: arr,
                        res: res
                    })
                    $('.morescale-sort-up').addClass('active').siblings().removeClass('active')
                    let a = $('.sortby').text()
                    $('.sortby').text($(ev.target).text())
                    ev.target.innerText = a;
                    $('.morescale-wrapper').html(html);
                }
            })
        }
        $('.sortby-container').hide()
    }
    showsortby() {
        $('.sortby-container').show()
    }
    sortlist() {
        var that = this;
        $.ajax({
            dataType: "json",
            type: 'get',
            url: '/libs/json/cityconfig.json',
            success: function (data) {
                let res = data;
                var fn;
                var by;
                $(that).addClass('active').siblings().removeClass('active')
                if($('.sortby').text() == '按价格排序'){
                    by = 'lowestPrice'
                }else{
                    by = 'lowestDiscount'
                }
                if ($(that).hasClass('morescale-sort-up')) {
                    fn = function (n1, n2) {
                        return n1.airlinePriceInfo[by] - n2.airlinePriceInfo[by];
                    }
                } else {
                    fn = function (n1, n2) {
                        return n2.airlinePriceInfo[by] - n1.airlinePriceInfo[by];
                    }
                }
                let arr = res.scale.dstAndAirlinePriceInfo.sort(fn);
                let html = morescalesortView({
                    list: arr,
                    res: res
                })
                $('.morescale-wrapper').html(html);
            }
        })
    }
    get() {
        return $.ajax({
            dataType: "json",
            type: 'get',
            url: '/libs/json/cityconfig.json'
        })
    }
    morescaleTitleRender(titleLi) {
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('特价机票').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span><img class="header-btn" src="http://m.hnair.com/package/images/more.svg"></span>');
        $('footer').hide();
    }
    back() {
        location.hash = 'position';
    }
}

export default new Morescale()