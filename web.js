function parseResult(text) {
    const title = text.match(/<title[^>]*>([^<]+)<\/title>/)[1];
    if(title && title.indexOf('Штрих-код')>3){
        const index = title.indexOf('Штрих-код');
        const result = title.substr(0,index - 3)
        return result
    }
    return null
}

function searchBarcode(barcode) {
	var url = `https://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=${encodeURIComponent(barcode)}`            
	fetch(url)
		.then(response => response.text())
		.then(text => parseResult(text))
		.then(result => sendResponse(result))
		.catch(error => console.log(error))
}

function sendResponse(text){
	if(text){
		$('#id_name').attr('placeholder', `Нажмите 2 раза пробел для автозаполнения (${text})`)
		$('#id_name').attr('autoName', text)
	}
}

  
$(function(){
    $('#id_ean13').on('change', function(){
        const value = $('#id_ean13').val()
        if(value && value.length === 13){
            searchBarcode(value)
        }
    })
    $('#id_name').on('keyup', function(){
        const value = $('#id_name').val()
        if(value && value.length === 2 && value === '  '){
            $('#id_name').val($('#id_name').attr('autoName'))
        }
    })
})