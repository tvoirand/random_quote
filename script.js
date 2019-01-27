
function display_random_quote(){
    `
    Open quotes database xml file, read it, and display a random quote.
    `

    var xhttp_request = new XMLHttpRequest();
    xhttp_request.open("GET", "quotes_database.xml", true);
    xhttp_request.send();

    xhttp_request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            quotes_array = read_database(this);

            id = Math.floor(Math.random() * quotes_array.length);
            quote_display_str = "";

            for (col = 1; col < quotes_array[id].length; col++){
                if (quotes_array[id][col] !== null && quotes_array[id][col] !== ""){
                    if (col == 4){
                        quote_display_str = quote_display_str.concat("page ")
                    }
                    if (col == 5) {
                        quote_display_str = quote_display_str.concat("<br>")
                    }
                    quote_display_str = quote_display_str.concat(quotes_array[id][col])
                    quote_display_str = quote_display_str.concat("<br>")
                }
            }
            console.log(quote_display_str)
            document.getElementById("quote_div").innerHTML = quote_display_str;
        }

    };
}

function read_database(xml) {
    `
    Read quotes database xml file.
    Output:
        -quotes_array   [[str, ...], ...]
            -contains for each quote: ID, AUTHOR, BOOK, EDITION, PAGE, TEXT
    `

    var xml_doc = xml.responseXML;
    var quotes_array = [];
    var quotes_xml = xml_doc.getElementsByTagName("QUOTE");

    for (i = 0; i < quotes_xml.length; i++) {
        quotes_array.push(
            [
                quotes_xml[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue,
                quotes_xml[i].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue,
                quotes_xml[i].getElementsByTagName("BOOK")[0].childNodes[0].nodeValue,
                quotes_xml[i].getElementsByTagName("EDITION")[0].childNodes[0].nodeValue,
                quotes_xml[i].getElementsByTagName("PAGE")[0].childNodes[0].nodeValue,
                quotes_xml[i].getElementsByTagName("TEXT")[0].childNodes[0].nodeValue,
            ]
        );
    }

    return quotes_array;
}
