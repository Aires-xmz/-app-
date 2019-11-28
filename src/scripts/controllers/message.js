import messageView from '../views/message.art'
import messageModel from '../models/message'
import BSscroll from 'better-scroll'
import messagelistView from '../views/messagelist.art'
const _ = require('lodash');
class Message {
    constructor() {
        this.list = [];
        this.totalCount = 14;
        this.page = 1;
        this.arr = [];
    }
    renderer(list) {
        let messageListHtml = messagelistView({
            messageList: list
        })
        $('main ul').html(messageListHtml)
    }
    async render(titleLi) {
        let data = await messageModel.get('messagelist');
        let arr = _.chunk(data.newsTitleList, 15);
        let html = messageView({
            messageList: arr[1],
        })
        $('main').html(html);
        this.list = arr[1];
        this.arr = arr;
        this.messageTitleRender(titleLi);
        this.slide();
        $('.historyback').on('tap', this.back);
    }
    slide() {
        // 定义图片对象
        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')
        let bScroll = new BSscroll('.message-container', {
            bounce: 'false',
            probeType: 2,
            scrollbar: true
        })
        // 开始要隐藏下拉刷新的div
        bScroll.scrollBy(0, -40);
        //滚动时判断需求
        bScroll.on('scroll', function () {
            if (this.y > 0) {
                $imgHead.addClass('up')
            }

            if (this.maxScrollY > this.y) {
                $imgFoot.addClass('down')
            }
        })
        let that = this;
        //滚动结束了
        bScroll.on('scrollEnd', function () {
            // 下拉刷新
            if (this.y >= 0) {
                $imgHead.attr('src', '/assets/images/ajax-loader.gif');
                console.log('totalCount = ' + that.totalCount);

                if (!that.arr[0][that.totalCount]) {
                    console.log('已经到头了');
                    clearTimeout(timer);
                    var timer = setTimeout(() => {
                        bScroll.scrollBy(0, -40);
                        $imgHead.attr('src', '/assets/images/arrow.png');
                        $imgHead.removeClass('up');    
                    }, 500);
                    return;
                }
                let result = that.arr[0][that.totalCount];
                that.totalCount--;
                // 1. 将原来数据list和现在返回的数据做拼接，
                // 2.重新渲染
                that.list = [result, ...that.list];
                var timer = setTimeout(function () {
                    clearTimeout(timer);
                    that.renderer(that.list);
                    bScroll.scrollBy(0, -40);
                    $imgHead.attr('src', '/assets/images/arrow.png');
                    $imgHead.removeClass('up');
                }, 500);
                bScroll.refresh()
            }
            // 上拉加载更多
            if (this.maxScrollY >= this.y && that.arr[that.page]) {
                console.log('pageNumber = ' + that.page)
                $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
                let result = that.arr[that.page];
                that.page++;
                // 更新pageCount, 因为有新的内容发布出来了
                // that.totalCount = totalCount
                // 1.将原来数据list和现在返回的数据做拼接，
                // 2.重新渲染
                that.list = [...that.list, ...result]
                that.renderer(that.list)
                bScroll.scrollBy(0, 40)
                $imgHead.attr('src', '/assets/images/arrow.png')
                $imgHead.removeClass('down')
                bScroll.refresh()
            }else{
                $('.foot').text('已全部显示')
            }
        })
    }
    messageTitleRender(titleLi) {
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('消息中心').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('');
        $('footer').show();
    }
    back() {
        window.history.back();
    }
}

export default new Message();