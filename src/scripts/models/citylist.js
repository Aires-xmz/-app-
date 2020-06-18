import cityChooseView from '../views/cityChoose.art'
import suggestlistView from '../views/suggestlist.art'
class CityChoose {
    async rerender(site) {
        let citylist = await this.get();
        var res = this.formatList(citylist.showObj[site].airportList, "pinyin")
        let html = cityChooseView({
            list: citylist.showObj[site],
            fir: citylist.firstCityLetter,
            air: res
        })
        $('.citylist-wrapper').html(html);
    }
    suglistRender(val, list) {
        let html = suggestlistView({
            val: val,
            list: list
        })
        $('.suggest-wrapper').html(html).on('tap', this.setCity);
    }
    setCity(ev) {
        let dep = localStorage.getItem('departure');
        let des = localStorage.getItem('destination');
        let val = '';
        if (ev.target.className === 'citylist-column-item') {
            val = ev.target.innerHTML;
        } else if (ev.target.nodeName.toLowerCase() === 'span') {
            val = ev.target.parentNode.children[0].innerHTML;
        } else if (ev.target.className === 'citylist-list-row-item') {
            val = ev.target.children[0].innerHTML;
        } else {
            return;
        }
        if (dep == 'true') {
            setLocal('departure', val)
        } else if (des == 'true') {
            setLocal('destination', val)
        }

        function setLocal(key, val) {
            localStorage.setItem(key, val);
        }
        location.hash = 'reserve';
    }
    get() {
        return $.ajax({
            type: "get",
            datatype: "json",
            url: "/libs/json/citylist.json",
        });
    }
    formatList(data, filed) {
        var j = 0;
        var fin = [];
        sp(data, filed, j);

        function sp(data, filed, j) {
            var temp = "";
            var res = [];
            if (j < data.length) {
                for (var i = j; i < data.length; i++) {
                    if (data[i + 1])
                        temp = data[i + 1][filed].substr(0, 1);
                    if (temp == data[i][filed].substr(0, 1)) {
                        res.push(data[i])
                        j++;
                    } else {
                        res.push(data[i])
                        j++;
                        break;
                    }
                }
                fin.push(res)
                return sp(data, filed, j)
            }
        }
        return fin;
    }
}
export default new CityChoose()