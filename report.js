function printReport(pages){
    console.log('Printing Report');
    // Step - 1
    // Create the array of key-value pairs
    var items = Object.keys(pages).map(
        (key) => { return [key, pages[key]] });
    
    // Step - 2
    // Sort the array based on the second element (i.e. the value)
    items.sort(
        (first, second) => { return second[1] - first[1] }
    );
    
    // Step - 3
    // Obtain the list of keys in sorted order of the values.
    var keys = items.map((e) => { return e[0] });
    for(let key of keys){
        console.log(`Found ${pages[key]} internal links to ${key}`);
    }
}

module.exports = {
    printReport
}