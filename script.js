
quotes = [
    "Test quote number 1",
    "Test quote number 2",
];

function pick_quote(){
    `
    Pick a random quote from the database
    `
    id = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote_div").innerHTML = quotes[id];
}
