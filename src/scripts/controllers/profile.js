import profileView from '../views/profile.art'
import profileModel from '../models/profile'
class Profile {
    render(titleLi){
        let isSignin = JSON.parse(localStorage.getItem('status'))

        let html = profileView({
            isSignin
        });

        $('main').html(html);
        $('.profile-top-login-btn').on('tap',this.login);
        $('.profile-logout').on('tap',this.loginout)
        this.profileTitleRender(titleLi);
        profileModel.slide('.profile-container');
        $('.message').on('tap',this.toMessage);
    }
    loginout(){
        localStorage.setItem('status',false)
        location.hash = 'position'
    }
    login(){
        location.hash = 'login';
    }
    toMessage(){
        location.hash = $(this).attr('data-to');
    }
    profileTitleRender(titleLi){
        titleLi.eq(0).html('');
        titleLi.eq(1).html('我的').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span class="message" data-to="message">&#xe69b;</span>');
        $('footer').show();
    }
}

export default new Profile();