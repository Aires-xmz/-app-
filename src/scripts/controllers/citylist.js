import citylistView from '../views/citylist.art'
import cityChooseModel from '../models/citylist'
import BScroll from 'better-scroll'
class Citylist {

    async render(titleLi) {

        let citylist = await cityChooseModel.get();
        var res = cityChooseModel.formatList(citylist.showObj.domestic.airportList, "pinyin")
        let html = citylistView({
            list: citylist.showObj.domestic,
            fir: citylist.firstCityLetter,
            air: res
        });
        $('main').html(html);
        this.citylistTitleRender(titleLi);
        this.init();
    }
    init() {
        $('.historyback').on('tap', this.back);
        $('#input').on('input', this.showSugAndDel);
        $('.citylist-tab').on('tap', this.swap);
        let bscroll = new BScroll('.citylist-container', {
            probeType: 2,
            bounce: false,
            scrollbar: true,
            scrollX: false,
            scrollY: true
        })
        new BScroll('.suggest-container', {
            probeType: 2,
            bounce: false,
            scrollbar: true,
            scrollX: false,
            scrollY: true
        })
        $('.citylist-list-letters-item').on('tap', function () {
            let floor = $('.floor')[$(this).index()];
            $(this).addClass('active').siblings().removeClass('active');
            bscroll.scrollToElement(floor);
        })
        $('.citylist-wrapper').on('tap', cityChooseModel.setCity);
        
        this.onReSize();
    }
    onReSize() {
        let ccH = $('.citylist-container').height();
        let ctH = $('.citylist-tabs').height();
        $('.citylist-list-letters').height(ccH);
        $('.suggest-container').height(ccH + ctH);
        $(window).on('resize', function () {
            ccH = $('.citylist-container').height();
            ctH = $('.citylist-tabs').height();
            $('.citylist-list-letters').height(ccH);
            $('.suggest-container').height(ccH + ctH);
        })
    }
    swap() {
        if (!$(this).children().hasClass('citylist-tab-item-active')) {
            $(this).children().addClass('citylist-tab-item-active').parent().siblings().children().removeClass('citylist-tab-item-active');
        }
        if ($(this).children().html() == '国内') {
            cityChooseModel.rerender("domestic")
        } else {
            cityChooseModel.rerender("international")
        }
    }
    async showSugAndDel() {
        if ($(this).val()) {
            let citylist = await cityChooseModel.get();
            $('.suggest-container').show();
            let list = citylist.sortObj.airportList;
            $('.suggest-wrapper').empty();
            cityChooseModel.suglistRender($(this).val(), list);
            $('.citylist-input-delete').css('display', 'inline-block').on('tap', function () {
                $('#input').val("");
                $(this).prop("ontap", null).off("tap").hide();
                $('.suggest-container').hide()
            });
        } else {
            $('.citylist-input-delete').prop("ontap", null).off("tap").hide();
            $('.suggest-container').hide()
        }
    }
    citylistTitleRender(titleLi) {
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('机场列表').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span><img class="header-btn" src="http://m.hnair.com/package/images/more.svg"></span>');
        $('footer').hide();
    }
    back() {
        window.history.back();
    }
}

export default new Citylist();