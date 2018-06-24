Buttons on top of screen, taking up an entire HTMLTableRowElement
Search function below that in separate row. Input field with default text saying "add subject!" and submit button to the right.
Buttons share same background and text color.

Initial variable of arrays holding what should initially populate the page, in string format.
BE SURE TO REVISIT OTHER ACTIVITIES!

On the "submit" button for the input field, said subject needs to be added to the array and have everything generated

So when the index.html page is loaded, I want to loop through my array and generate buttons for each of them.

So, an AJAX call inside of a for loop.

How many separate functions to have?

---A function to actually run the AJAX call
---A for loop for the initial buttons inside of the array
---A "submit" function that can run the AJAX call as well as elements of the for loop?

for (i = 0; i < subjectsArray.length, i++) {
    create a button
    give it attributes for class, unique id, and value equal to its' text, with inline buttons
    append it to #buttons-column div
    
}