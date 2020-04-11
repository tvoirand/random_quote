/*
Script for random_quote.
*/

import { xhr_success, xhr_error, load_file } from "./modules/utils.js";

// load quotes database and fill quote div when page is loaded
document.getElementById("index_body").onload = load_file(
    "database.json",
    random_quote
);

function random_quote() {
    /*
    Main function for random quote.
    Callback function which gets executed by a XHR request reading the database.json file.
    */

    // store the json database in an array of javascript objects
    let quotes_array = JSON.parse(this.responseText).quotes;

    // get first random quote
    let quote = pick_random_quote(quotes_array);

    // fill quote div on html page
    fill_quote_div(quote);

    //---------------------------------------------------------
    // creating processing (p5js) sketch for the live quote part

    // global variables
    const canvas_width = 400;
    const canvas_height = 300;
    let word_index = 0; // initiate word index
    let quote_list = quote.text.split(" "); // split the quote in a list of words
    let displayed_word = ""; //initiate displayed word
    const s = sketch => {
        /*
        Function which takes a "sketch" object as argument and attaches properties such as setup and
        draw functions which are needed for a p5js sketch.
        See: https://github.com/processing/p5.js/wiki/Global-and-instance-mode
        */

        sketch.setup = function() {
            /*
            Processing setup function.
            Called one time at start.
            */
            let canvas = sketch.createCanvas(canvas_width, canvas_height);
            canvas.parent(canvas_div);
            sketch.stroke(255);
            sketch.frameRate(30);
            sketch.textSize(30);
            sketch.textAlign(sketch.CENTER, sketch.CENTER);
            sketch.textFont("courier");
            sketch.fill(255);
        };

        sketch.draw = function() {
            /*
            Processing main loop function.
            */

            // clear background
            sketch.background(0);

            // display current word
            sketch.text(displayed_word, sketch.width / 2, sketch.height / 2);
        };

        sketch.mousePressed = function() {
            // find new quote if end of current quote reached
            if (quote_list.length == word_index) {
                // pick the new quote and avoid picking the same quote
                let new_quote = quote;
                while (new_quote == quote) {
                    new_quote = pick_random_quote(quotes_array);
                }
                quote = new_quote;

                quote_list = quote.text.split(" "); // split the quote in a list of words
                quote_list.unshift(" "); // add a whitespace as first element in the quote list
                word_index = 0; // re-initiate the word count
            }

            // diplay the current word
            displayed_word = quote_list[word_index];

            // increase word count
            word_index += 1;
        };
    };
    let myp5 = new p5(s);
}

function fill_quote_div(quote) {
    /*
    Prepare display string and fill the quote div in the HTML page.
    Input:
        -quote  {author: str, book: str, edition: str, page: str, text: str}
    */

    // initiate the string to display
    let output_string = "";

    // add author
    if (quote.author !== null && quote.author !== "") {
        output_string = output_string.concat(quote.author);
        output_string = output_string.concat("<br>");
    }

    // add book
    if (quote.book !== null && quote.book !== "") {
        output_string = output_string.concat(quote.book);
        output_string = output_string.concat("<br>");
    }

    // add edition and page only if both are available
    if (
        quote.edition !== null &&
        quote.edition !== "" &&
        quote.page !== null &&
        quote.page !== ""
    ) {
        output_string = output_string.concat("Edition ");
        output_string = output_string.concat(quote.edition);
        output_string = output_string.concat("<br>");
        output_string = output_string.concat("Page ");
        output_string = output_string.concat(quote.page);
        output_string = output_string.concat("<br>");
    }

    // add text
    if (quote.text !== null && quote.text !== "") {
        output_string = output_string.concat("<br>");
        output_string = output_string.concat(quote.text);
        output_string = output_string.concat("<br>");
    }

    // fill the quote div
    document.getElementById("quote_div").innerHTML = output_string;
}

function pick_random_quote(quotes_array) {
    /*
    Pick a random quote from a quote array.
    Input:
        -quotes_array   [{author: str, book: str, edition: str, page: str, text: str}, ...]
    */

    // pick a random quote
    let id = Math.floor(Math.random() * quotes_array.length);

    return quotes_array[id];
}
