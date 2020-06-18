import moredesView from '../views/moredes.art'
import moredeslistView from '../views/moredeslist.art'
const BScroll = require('better-scroll')
class Moredes {
    constructor() {
        this.list = [];
        this.page = 1;
        this.arr = [];
    }
    async render(titleLi) {
        let res = await this.get();
        this.arr = _.chunk(res.hotDest,5);
        let html = moredesView({
            list: this.arr[0]
        })
        this.list = this.arr[0]
        $('main').html(html)
        this.moredesTitleRender(titleLi)
        $('.historyback').on('tap', this.back)
        this.slide();
    }
    get() {
        return $.ajax({
            dataType: "json",
            type: 'get',
            url: '/libs/json/cityconfig.json'
        })
    }
    slide() {
        // 定义图片对象
        let $imgFoot = $('.foot img')
        let bScroll = new BScroll.default('.moredes-container', {
            bounce: 'false',
            probeType: 2,
            scrollbar: true
        })
        //滚动时判断需求
        bScroll.on('scroll', function () {
            if (this.maxScrollY > this.y) {
                $imgFoot.addClass('down')
            }
        })
        let that = this;
        //滚动结束了
        bScroll.on('scrollEnd', function () {
            // 上拉加载更多
            if (this.maxScrollY >= this.y && that.arr[that.page]) {
                console.log('pageNumber = ' + that.page)
                $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
                let result = that.arr[that.page];
                that.page++;
                // 1.将原来数据list和现在返回的数据做拼接，
                // 2.重新渲染
                that.list = [...that.list,...result]
                that.renderer(that.list)
                $imgFoot.attr('src', '/assets/images/arrow.png')
            }else{
                $('.foot').html('已展示全部热门城市')
            }
        })
    }
    renderer(list) {
        let moredeslistHtml = moredeslistView({
            list: list
        })
        $('.moredes-list').html(moredeslistHtml)
    }
    moredesTitleRender(titleLi) {
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('热门目的地').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span><img class="header-btn" src="http://m.hnair.com/package/images/more.svg"></span>');
        $('footer').hide();
    }
    back() {
        location.hash = "position"
    }
}

export default new Moredes()