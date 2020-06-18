import loginView from '../views/login.art'
import loginModel from '../models/login'

class Login {
    render(titleLi) {
        let html = loginView({});
        $('main').html(html);
        this.toLogin(titleLi);
        $('.login-status > div').on('tap', this.check);
        this.checkPwd();
    }
    toLogin(titleLi) {
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('登录').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('');
        $('footer').hide();
        $('.historyback').on('tap', loginModel.back);
    }
    checkPwd() {
        $('#loginBtn').on('tap',function(){
            var result = JSON.parse(localStorage.getItem('user'))
            var uname = $('.login-input-account').val()
            var upwd = $('.login-input-pwd').val()
            if(result.username === uname && result.password === upwd){
                localStorage.setItem('status',true)
                window.location.hash = 'position'
            }else{
                alert('帐号或密码错误')
            }
        })
    }
}

export default new Login();