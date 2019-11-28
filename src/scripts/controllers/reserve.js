import reserveView from '../views/reserve.art'

class Reserve {
    render(titleLi) {
        let dep = localStorage.getItem('departure');
        let des = localStorage.getItem('destination');
        let html = reserveView({
            departure: dep,
            destination: des
        })
        $('main').html(html);
        this.reserveTitleRender(titleLi);
        this.init();
    }
    init() {
        let routeType = $('.reserve-route-type>span');
        let bookType = $('.reserve-book-type>div>span');
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
        /* $('.go-dates').on('tap',function(){
            localStorage.setItem('goday',true)
            location.hash = $(this).attr('data-to')
        }) */
        $('.return-dates').hide();
        $('.choose-seat-level').hide();
        $('.historyback').on('tap', this.back);
        $('.swap').on('tap', this.swap);
        routeType.on('tap', this.routeSelected);
        bookType.on('tap', this.bookSelected);
        $('.departure').on('tap', this.changeHash);
        $('.destination').on('tap', this.changeHash);
        $('.reserve-passenger').on('tap', function () {
            if (!this.checked) {
                var $a = $('.passenger-adult')
                var $c = $('.passenger-child')
                var $b = $('.passenger-baby')
                var a = parseInt($a.text())
                var c = parseInt($c.text())
                var b = parseInt($b.text())
                $('.select-adult').text(a)
                $('.select-child').text(c)
                $('.select-baby').text(b)
                $('.passenger-container').show()
            }
        })
        $('.passenger-container').on('tap', function (ev) {
            var $a = $('.select-adult')
            var $c = $('.select-child')
            var $b = $('.select-baby')
            var a = parseInt($a.text())
            var c = parseInt($c.text())
            var b = parseInt($b.text())
            var sumF = a + c;

            function isWho(elem) {
                if (elem == $a.prev().get(0)) {
                    if (a > 1) {
                        sumF--;
                        a--;
                        $a.text(a)
                    }
                } else if (elem == $a.next().get(0)) {
                    if (sumF < 5) {
                        sumF++;
                        a++;
                        $a.text(a)
                    }
                } else if (elem == $c.prev().get(0)) {
                    if (c > 0) {
                        sumF--;
                        c--;
                        $c.text(c)
                    }
                } else if (elem == $c.next().get(0)) {
                    if (sumF < 5) {
                        sumF++;
                        c++;
                        $c.text(c)
                    }
                } else if (elem == $b.prev().get(0)) {
                    if (b > 0) {
                        b--;
                        $b.text(b)
                    }
                } else if (elem == $b.next().get(0)) {
                    if (b < 3 && b < a) {
                        b++;
                        $b.text(b)
                    }
                }
                if (a == 1) {
                    $a.prev().get(0).style.color = 'rgb(210,201,210)'
                    $a.prev().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $a.prev().get(0).style.color = '#444d54'
                    $a.prev().get(0).style.borderColor = '#444d54'
                }
                if (sumF == 5) {
                    $a.next().get(0).style.color = 'rgb(210,201,210)'
                    $a.next().get(0).style.borderColor = 'rgb(210,201,210)'
                    $c.next().get(0).style.color = 'rgb(210,201,210)'
                    $c.next().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $a.next().get(0).style.color = '#444d54'
                    $a.next().get(0).style.borderColor = '#444d54'
                    $c.next().get(0).style.color = '#444d54'
                    $c.next().get(0).style.borderColor = '#444d54'
                }
                if (b == 0) {
                    $b.prev().get(0).style.color = 'rgb(210,201,210)'
                    $b.prev().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $b.prev().get(0).style.color = '#444d54'
                    $b.prev().get(0).style.borderColor = '#444d54'
                }
                if (c == 0) {
                    $c.prev().get(0).style.color = 'rgb(210,201,210)'
                    $c.prev().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $c.prev().get(0).style.color = '#444d54'
                    $c.prev().get(0).style.borderColor = '#444d54'
                }
                if (b == a) {
                    $b.next().get(0).style.color = 'rgb(210,201,210)'
                    $b.next().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $b.next().get(0).style.color = '#444d54'
                    $b.next().get(0).style.borderColor = '#444d54'
                }
            }

            function who(elem) {
                if (elem == $a.prev().get(0)) {
                    if (a > 1) {
                        sumF--;
                        a--;
                        $a.text(a)
                    }
                } else if (elem == $a.next().get(0)) {
                    if (sumF < 3) {
                        sumF++;
                        a++;
                        $a.text(a)
                    }
                } else if (elem == $c.prev().get(0)) {
                    if (c > 0) {
                        sumF--;
                        c--;
                        $c.text(c)
                    }
                } else if (elem == $c.next().get(0)) {
                    if (sumF < 3) {
                        sumF++;
                        c++;
                        $c.text(c)
                    }
                }
                if (a == 1) {
                    $a.prev().get(0).style.color = 'rgb(210,201,210)'
                    $a.prev().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $a.prev().get(0).style.color = '#444d54'
                    $a.prev().get(0).style.borderColor = '#444d54'
                }
                if (c == 0) {
                    $c.prev().get(0).style.color = 'rgb(210,201,210)'
                    $c.prev().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $c.prev().get(0).style.color = '#444d54'
                    $c.prev().get(0).style.borderColor = '#444d54'
                }
                if (sumF == 3) {
                    $a.next().get(0).style.color = 'rgb(210,201,210)'
                    $a.next().get(0).style.borderColor = 'rgb(210,201,210)'
                    $c.next().get(0).style.color = 'rgb(210,201,210)'
                    $c.next().get(0).style.borderColor = 'rgb(210,201,210)'
                } else {
                    $a.next().get(0).style.color = '#444d54'
                    $a.next().get(0).style.borderColor = '#444d54'
                    $c.next().get(0).style.color = '#444d54'
                    $c.next().get(0).style.borderColor = '#444d54'
                }
            }
            if ($(ev.target).hasClass('pimg')) {
                if ($('.pas-baby').css('display') == 'none') {
                    who(ev.target)
                } else {
                    isWho(ev.target)
                }
            } else if ($(ev.target).hasClass('confirm-button')) {
                $('.passenger-adult').text(a)
                $('.passenger-child').text(c)
                $('.passenger-baby').text(b)
                $('.passenger-container').hide()
            } else if (ev.target.className != 'passenger-container') {

            } else {
                $('.passenger-container').hide()
            }
        })
        $('.choose-level').on('tap', this.showlevel)
        $('.chooselevel-container').on('tap', this.setlevel)
    }
    showlevel() {
        if (!this.checked) {
            $('.chooselevel-container').show()
        }
    }
    setlevel(ev) {
        if (ev.target.className == 'chooselevel-item') {
            var a = ev.target.innerText;
            $('.choose-level').text(a)
        }
        $('.chooselevel-container').hide()
    }
    changeHash() {
        let a;
        if ($(this).hasClass('departure')) {
            a = 'departure';
        } else {
            a = 'destination';
        }
        localStorage.setItem(a, 'true');
        location.hash = $(this).attr('data-to');
    }
    swap() {
        let temp = $('.departure').html();
        let temp2 = $('.destination').html();
        $('.destination').html(temp);
        $('.departure').html(temp2);
        localStorage.setItem('destination', temp);
        localStorage.setItem('departure', temp2);
    }
    bookSelected() {
        if ($(this).html() == "积分兑换") {
            $('.choose-seat-level').show();
            $('.baby').css('visibility', 'hidden');
            $('.pas-baby').hide();
            $('.max3').show();
            $('.max5').hide();
        } else {
            $('.choose-seat-level').hide();
            $('.baby').css('visibility', 'visible');
            $('.pas-baby').show();
            $('.max5').show();
            $('.max3').hide();
        }
        $(this).addClass('reserve-book-select-type')
            .removeClass('reserve-book-unselect-type')
            .siblings().removeClass('reserve-book-select-type')
            .addClass('reserve-book-unselect-type');
    }
    routeSelected() {
        if ($(this).html() == "往返") {
            $('.return-dates').show();
            /* $('.return-dates').on('tap',function(){
                localStorage.setItem('returnday',true)
                location.hash = $(this).attr('data-to')
            }) */
        } else {
            $('.return-dates').prop("ontap", null).off("tap").hide();
        }
        $(this).addClass('reserve-route-select-type').siblings().removeClass('reserve-route-select-type');
    }
    reserveTitleRender(titleLi) {
        titleLi.eq(0).html('<span class="historyback">&#xe508;</span>');
        titleLi.eq(1).html('机票预订').addClass('font-fly').removeClass('font-position');
        titleLi.eq(2).html('<span><img class="header-btn" src="http://m.hnair.com/package/images/more.svg"></span>');
        $('footer').hide();
    }
    back() {
        location.hash = 'position';
    }
}

export default new Reserve();