import dateView from '../views/date.art'
class DateChoose{
    render(titleLi){
        let html = dateView({})

        $('main').html(html)
        this.datechooseTitleRender(titleLi)
        $('.historyback').on('tap', this.back)
        $(document).ready(function () {
			// date time picker
			if ($(".iDate.date").length > 0) {
				$(".iDate.date").datetimepicker({
					locale: "zh-cn",
					format: "YYYY-MM-DD",
					dayViewHeaderFormat: "YYYY年 MMMM"
				});
			}
        })
        $('.ok').on('tap',function(){
            var rq = $('.date-selected').val()
            var arrRQ = rq.split('-')
            if(JSON.parse(localStorage.getItem('goday'))){
                localStorage.setItem('goday',JSON.stringify({y:arrRQ[0],m:arrRQ[1],d:arrRQ[2]}))
                window.history.back()
            }else if(JSON.parse(localStorage.getItem('returnday'))){
                localStorage.setItem('returnday',JSON.stringify({y:arrRQ[0],m:arrRQ[1],d:arrRQ[2]}))
                location.hash = 'reserve'
            }else{
                location.hash = 'reserve'
            }
        })
    }
    datechooseTitleRender(titleLi) {
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('日期选择').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span><img class="header-btn" src="http://m.hnair.com/package/images/more.svg"></span>');
        $('footer').hide();
    }
    back() {
        window.history.back();
    }
}
export default new DateChoose()