function handleClientLoad() {
    gapi.load('client', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyDXi4IG16OBUtscQ1tt1UQKux2j2E3rNMA',
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(function () {
        console.log('Google Sheets API initialized');
    }).catch(function (error) {
        console.error('Error initializing Google Sheets API:', error);
    });
}

function initClientAndBuscarEnGoogleSheets() {
    gapi.load('client', function() {
        gapi.client.init({
            apiKey: 'AIzaSyDXi4IG16OBUtscQ1tt1UQKux2j2E3rNMA',
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(function () {
            console.log('Google Sheets API initialized');
            buscarEnGoogleSheets();
        }).catch(function (error) {
            console.error('Error initializing Google Sheets API:', error);
        });
    });
}

function buscarEnlace() {
    var codigoBarras = document.getElementById("codigoBarras").value;
    var enlace = "https://sellercentral.amazon.es/orders-v3/search?_encoding=UTF8&sort=status_desc&shipByDate=all&communicationDeliveryId=d79242b8-36da-48cb-afd4-18d0959c9a57&page=1&q=" + codigoBarras + "&qt=tracking-id";
    window.open(enlace, '_blank');
}

function buscarEnlaceProducto() {
    var codigoBarras = document.getElementById("codigoBarras").value;
    var enlace = "https://sellercentral.amazon.es/inventory/ref=xx_invmgr_favb_xx?tbla_myitable=sort:%7B%22sortOrder%22%3A%22DESCENDING%22%2C%22sortedColumnId%22%3A%22date%22%7D;search=" + codigoBarras + ";pagination:1";
    window.open(enlace, '_blank');
}

function buscarEnGoogleSheets() {
    var codigoBarras = document.getElementById("codigoBarras").value;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1bqc-7HSedWBW8hMGzjhn6Q_bol6pnqT9tx90q2MMqTI',
        range: 'Ubicaciones!A:C',
    }).then(function(response) {
        var values = response.result.values;

        for (var i = 0; i < values.length; i++) {
            if (values[i][0] === codigoBarras) {
                var producto = values[i][1];
                var ubicacion = values[i][2];

                // Muestra los resultados debajo de los botones
                document.getElementById("productoResultado").innerHTML = "Producto: " + producto;
                document.getElementById("ubicacionResultado").innerHTML = "Ubicación: " + ubicacion;
                break;
            }
        }
    }).catch(function(error) {
        console.error('Error en la solicitud a Google Sheets:', error);
    });
}
