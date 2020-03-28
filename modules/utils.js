/*
Utils module with xhr requests related functions for random_quote.
*/

function xhr_success() {
    /*
    Invokes callback function of xhr request if this request is successfull.
    */
    this.callback.apply(this);
}

function xhr_error() {
    /*
    Console log error status of xhr request if this request is not successfull.
    */
    console.error(this.statusText);
}

function load_file(url, callback) {
    /*
    Load file of given url and apply callback function.
    Input:
        -url        str
        -callback   function
    */
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.onload = xhr_success;
    xhr.onerror = xhr_error;
    xhr.open("GET", url, true);
    xhr.send(null);
}

export { xhr_success, xhr_error, load_file };
