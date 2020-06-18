import seatView from '../views/seat.art'
import BScroll from 'better-scroll'

class Seat{
    render(titleLi){
        let html = seatView({})
        $('main').html(html);

        this.seatTitleRender(titleLi);
        this.slide();
        $('.historyback').on('tap',this.back);
    }
    seatTitleRender(titleLi){
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('手机选座').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span><img class="header-btn" src="http://m.hnair.com/package/images/more.svg"></span>');
        $('footer').hide();
    }
    slide(){
        //better-scroll
        let bscrollMain = new BScroll('.seat-container',{
            probeType:2,
            bounce: false
        });
    }
    back(){
        window.history.back();
    }
}
export default new Seat();