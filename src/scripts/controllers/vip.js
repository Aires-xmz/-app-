import vipView from '../views/vip.art'
import loginController from '../controllers/login'
import BScroll from 'better-scroll'
class Vip {
    render(titleLi) {
        let isSignin = JSON.parse(localStorage.getItem('status'))
        this.vipTitleRender(titleLi);
        if (isSignin) {
            var html = vipView({});
            $('main').html(html);

            new BScroll('.vip-container', {
                bounce: false,
                probeType: 2
            })
            $('.vip-user-image-zoomout').on('tap',function(){
                $('.hna-member-show-card').show()
            })
            $('.close').on('tap',function(){
                $('.hna-member-show-card').hide()
            })
            $('.message').on('tap',function(){
                window.location.hash = 'message'
            })
        } else {
            loginController.render(titleLi);
        }
    }
    vipTitleRender(titleLi) {
        titleLi.eq(0).html('');
        titleLi.eq(1).html('金鹏卡').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span class="message" data-to="message">&#xe69b;</span>');
        $('footer').show();
    }
}

export default new Vip();