import indexController from '../controllers/'
import positionController from '../controllers/position'
import flyController from '../controllers/fly'
import vipController from '../controllers/vip'
import profileController from '../controllers/profile'
import loginController from '../controllers/login'
import seatController from '../controllers/seat'
import reserveController from '../controllers/reserve'
import citylistController from '../controllers/citylist'
import messageController from '../controllers/message'
import moredesController from '../controllers/moredes'
import morescaleController from '../controllers/morescale'
import datechooseController from '../controllers/date'
class Router {
    constructor(){
        this.render();
    }
    render(){
        window.addEventListener('load',this.handlePageload.bind(this));
        window.addEventListener('hashchange',this.handleHashchange.bind(this));
    }

    setActiveClass(hash){
        $(`footer>ul>li[data-to="${hash}"]`).addClass('active').siblings().removeClass('active');
    }
    handlePageload(){
        let hash = location.hash.substr(1) || 'position';
        window.location.hash = hash;
        indexController.render();
        this.handleEvent(hash);
    }
    handleEvent(hash){
        let pageController = {
            positionController,
            flyController,
            vipController,
            profileController,
            loginController,
            seatController,
            reserveController,
            citylistController,
            messageController,
            moredesController,
            morescaleController,
            datechooseController
        }
        let $titleLi = $('header>ul>li');
        pageController[hash + 'Controller'].render($titleLi);
        this.setActiveClass(hash);
    }
    handleHashchange(){
        let hash = location.hash.substr(1);
        this.handleEvent(hash);
    }
}

new Router();

// positionController.render();