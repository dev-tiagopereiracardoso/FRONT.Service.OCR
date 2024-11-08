function JAjaxSync(_Type, _Url, _Data, _DataError, _DataBeforeSend, _ReturnSucess, _Parameters) {
    $.ajax({
        type: _Type,
        url: _Url,
        data: _Data,
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        async: false,
        success: _ReturnSucess,
        context: _Parameters,
        error: _DataError,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept-Language', '*');
            xhr.setRequestHeader('Allow-Origin', '*');
            xhr.setRequestHeader('Accept', '*/*');
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
            xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
            xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, DELETE, POST, OPTIONS");
            xhr.setRequestHeader('Access-Control-Allow-Headers', "Origin, Content-Type, Accept");
        }
    });
}

function JAjaxTokenSync(_Type, _Url, _Data, _DataError, _DataBeforeSend, _ReturnSucess, _Parameters, _AccessToken) {
    $.ajax({
        type: _Type,
        url: _Url,
        data: _Data,
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        async: false,
        success: _ReturnSucess,
        context: _Parameters,
        error: _DataError,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept-Language', '*');
            xhr.setRequestHeader('Accept', '*/*');
            xhr.setRequestHeader('Allow-Origin', '*');
            xhr.setRequestHeader('Authorization', _AccessToken);
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
            xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
            xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, DELETE, POST, OPTIONS");
            xhr.setRequestHeader('Access-Control-Allow-Headers', "Origin, Content-Type, Accept");
        }
    });
}

function JAjaxSyncRetorno(_Type, _Url, _Data, _DataError, _DataBeforeSend, _AccessToken) {
    let _Retorno;
    $.ajax({
        type: _Type,
        url: _Url,
        data: _Data,
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        async: false,
        success: function (data) {
            _Retorno = data;
        },
        error: function (jqXhr, textStatus, data) {
            if (_DataError == "console") {
                console.log(jqXhr);
            }
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept-Language', '*');
            xhr.setRequestHeader('Allow-Origin', '*');
            xhr.setRequestHeader('Accept', '*/*');
            xhr.setRequestHeader('Authorization', _AccessToken);
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
            xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
            xhr.setRequestHeader('Access-Control-Allow-Methods', "GET, PUT, DELETE, POST, OPTIONS");
            xhr.setRequestHeader('Access-Control-Allow-Headers', "Origin, Content-Type, Accept");

            if (_DataBeforeSend != null) {
                JsExecuteFunction(_DataBeforeSend);
            }
        }
    });
    return _Retorno;
}

function JsExecuteFunction(_Value) {
    eval(_Value);
}

function Empty(property) {
    return (property === null || property === "" || typeof property === "undefined");
}

function Log(_Value) {
    console.log(_Value);
}
