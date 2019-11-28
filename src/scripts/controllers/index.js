const layoutView = require('../views/layout.art');
let root = document.getElementById('root');

class Index{
    render(){
        const html = layoutView();
        root.innerHTML = html;
        
        //路由切换页面点击事件
        $('footer>ul>li').on('tap',this.bindtap);
    }
    bindtap(){
        let hashTxt = $(this).attr('data-to');
        location.hash = hashTxt;
        
    }
    
}


export default new Index();
// module.exports = Index;
// new Index()