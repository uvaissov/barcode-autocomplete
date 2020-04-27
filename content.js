$(function(){
    $('#id_ean13').on('change', function(){
        const value = $('#id_ean13').val()
        if(value && value.length === 13){
            // $.get(`https://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=4606779762109`, function(data, status){
            //     console.log($(data).find('.randomBarcodes').text())
            //     console.log($(data).html())
            // });
            chrome.runtime.sendMessage( { contentScriptQuery: 'queryBarcode', barcode: value},
                text => {
                    if(text){
                        $('#id_name').attr('placeholder', `Нажмите 2 раза пробел для автозаполнения (${text})`)
                        $('#id_name').attr('autoName', text)
                    }
                });
        }
    })
    $('#id_name').on('keyup', function(){
        const value = $('#id_name').val()
        if(value && value.length === 2 && value === '  '){
            $('#id_name').val($('#id_name').attr('autoName'))
        }
    })
})