const flyView = require('../views/fly.art');
class Fly {
    render(titleLi){

        let isSignin = JSON.parse(localStorage.getItem("status"))
        let html = flyView({
            isSignin
        });
        $('main').html(html);
        
        $('.fly-unlogin-btn').on('tap',this.login);

        this.flyTitleRender(titleLi);
        $('.message').on('tap',this.toMessage);
    }
    login(){
        location.hash = 'login';
    }
    toMessage(){
        location.hash = $(this).attr('data-to');
    }
    flyTitleRender(titleLi){
        titleLi.eq(0).html('');
        titleLi.eq(1).html('飞行').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span class="reload">&#xe6e9;</span><span class="message" data-to="message">&#xe69b;</span>');
        $('footer').show();

        $('.reload').on('tap',function(){
            window.location.reload();
        })
    }

}

export default new Fly();