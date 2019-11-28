
module.exports = {
    get(filename) {
        return $.ajax({
            type: 'get',
            dataType: 'json',
            url: `/libs/json/${filename}.json`
        })
    }
}