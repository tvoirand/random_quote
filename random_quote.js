/*
Script for random_quote.
*/

import { draw_words } from "./modules/vjing.js";

// run display_random_quote function when page is loaded
document.getElementById("index_body").onload = display_random_quote();

function display_random_quote() {
    `
    Open quotes database json file, read it, and display a random quote.
    `;

    // load the database file
    var xhttp_request = new XMLHttpRequest();
    xhttp_request.open("GET", "database.json", true);
    xhttp_request.send();

    xhttp_request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // store the json database in an array of javascript objects
            let quotes_array = JSON.parse(this.responseText).quotes;

            // pick a random quote
            let id = Math.floor(Math.random() * quotes_array.length);
            let quote = quotes_array[id];

            // initiate the string to display
            let display_string = "";

            // add author
            if (quote.author !== null && quote.author !== "") {
                display_string = display_string.concat(quote.author);
                display_string = display_string.concat("<br>");
            }

            // add book
            if (quote.book !== null && quote.book !== "") {
                display_string = display_string.concat(quote.book);
                display_string = display_string.concat("<br>");
            }

            // add edition and page only if both are available
            if (
                quote.edition !== null &&
                quote.edition !== "" &&
                quote.page !== null &&
                quote.page !== ""
            ) {
                display_string = display_string.concat("Edition ");
                display_string = display_string.concat(quote.edition);
                display_string = display_string.concat("<br>");
                display_string = display_string.concat("Page ");
                display_string = display_string.concat(quote.page);
                display_string = display_string.concat("<br>");
            }

            // add text
            if (quote.text !== null && quote.text !== "") {
                display_string = display_string.concat("<br>");
                display_string = display_string.concat(quote.text);
                display_string = display_string.concat("<br>");
            }

            // add display string to html
            document.getElementById("quote_div").innerHTML = display_string;
        }
    };
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
