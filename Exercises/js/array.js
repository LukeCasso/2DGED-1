// Initialization
print("\n\n-- Arrays Initialization --\n");
 
let arr;
let arrReturn;
 
// Empty Array
arr = new Array();
arr = [];
 
// One Number in an Array
arr = new Array(10);
arr = [10];
 
// One String in an Array
arr = new Array("10");
arr = ["10"];
 
// Three Numbers in an Array
arr = new Array(10, 20, 30);
arr = [10, 20, 30];
 
// Mixed Array
arr = new Array(10, "10");
arr = [10, "10"];
 
// Accessing Array
print("\n\n-- Accessing Array --\n");
 
// Print First Element
print(arr[0]);
 
// Print Second Element
print(arr[1]);
 
// Update First Element
print("\n\n-- Update First Element --\n");
arr[0] = 20;
 
print(arr[0]);
 
// Create New Array
arr = [1, 2, 3, 4, 5, 6];
arrReturn = 0;
 
// Array Length
print("\n\n-- Array Length --\n");
print(arr.length);
 
// Iterate Over Array
print("\n\n-- Iterate Over Array--\n");
arr.forEach(function (item, index) {
    console.log(item, index);
});
 
print("\n");
 
for (element in arr) {
    print(element);
}
 
// Add to End of Array
print("\n\n-- Add to End --\n");
arrReturn = arr.push(7);
 
print(arr);
print(arrReturn);
 
// Remove from End of Array
print("\n\n-- Remove from End --\n");
arrReturn = arr.pop();
 
print(arr);
print(arrReturn);
 
// Remove from Front of Array
print("\n\n-- Remove from Front --\n");
arrReturn = arr.shift();
 
print(arr);
print(arrReturn);
 
// Add to Front of Array
print("\n\n-- Add to Front --\n");
arrReturn = arr.unshift(1);
 
print(arr);
print(arrReturn);
 
// Find Index of Included Element in Array
print("\n\n-- Find Index of Included Element --\n");
arrReturn = arr.indexOf(5);
 
print(arr);
print(arrReturn);
 
// Find Index of Missing Element in Array
print("\n\n-- Find Index of Missing Element --\n");
arrReturn = arr.indexOf(10);
 
print(arr);
print(arrReturn);
 
// Remove 1 Element at Index
print("\n\n-- Remove Middle Two Elements --\n");

//                   Find Mid Point        Remove Two Elements
//                                |        |
//                                v        v
arrReturn = arr.splice(arr.length / 2 - 1, 2)
 
print(arr);
print(arrReturn);
 
// Copy Array
print("\n\n-- Copy Array --\n");
arrReturn = arr.slice();
 
print(arr);
print(arrReturn);
 
arr = [1, 4, 2, 9, 16, 12, 3, 8];
 
// Sort Array (Alphanumeric!)
print("\n\n-- Sort Array --\n");
arrReturn = arr.sort();
 
print(arr);
print(arrReturn);
 
// Homework - Sort Numerically