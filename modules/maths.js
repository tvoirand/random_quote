/*
Maths module for the random_quote project.
*/

function array_average(input_array) {
    /*
    Compute average of input 1D array.
    Input:
        -input_array    [float, ...]
    Output:
        -               float
    */
    let sum = 0;
    for (let i = 0; i < input_array.length; i++) {
        sum += input_array[i];
    }
    return sum / input_array.length;
}

export { array_average };
