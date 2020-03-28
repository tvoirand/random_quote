/*
Script for random_quote.
*/

import { draw_words } from "./modules/vjing.js";
import { xhr_success, xhr_error, load_file } from "./modules/utils.js";

// load quotes database and fill quote div when page is loaded
document.getElementById("index_body").onload = load_file(
    "database.json",
    fill_quote_div
);

function fill_quote_div() {
    /*
    Callback function for a quotes database reading XHR request to fill quote_div with a quote.
    */

    // store the json database in an array of javascript objects
    let quotes_array = JSON.parse(this.responseText).quotes;

    // pick a random quote
    let quote = pick_random_quote(quotes_array);

    // fill the quote div
    document.getElementById("quote_div").innerHTML = quote;
}

function pick_random_quote(quotes_array) {
    /*
    Pick a random quote from a quote array.
    Input:
        -quotes_array   [{author: str, book: str, edition: str, page: str, text: str}, ...]
    */

    // pick a random quote
    let id = Math.floor(Math.random() * quotes_array.length);
    let quote = quotes_array[id];

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

    return output_string;
}

// creating processing sketch for the VJing part
// global variables
const canvas_width = 400;
const canvas_height = 300;
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
    };

    sketch.draw = function() {
        /*
        Processing main loop function.
        */

        // initialisation
        sketch.background(0);
        // translate(width / 2, height / 2);
        // background(0);

        draw_words(sketch);
    };
};
let myp5 = new p5(s);
