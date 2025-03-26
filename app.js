// import readline from "readline";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// const todos = [];

// const mainMenu = () => {
//     console.log("\n1. Add a task");
//     console.log("2. View the tasks");
//     console.log("3. Delete the tasks");
//     console.log ("4. Exit");
//     rl.question("Choose an option:", handleInputs)
// }
// const deleteTask = (index) => {
//     if(index>=0 && index < todos.length){
//         console.log(`\nDeleted task: ${todos[index]} `);
//         todos.splice(index, 1);
//         console.log("Deleted Successfully")
//     }else{
//         console.log("\nInvalid task number. Please try again.");
//     }
// };
// const handleInputs = (option) => {
//     if(option === "1"){
//         rl.question("Enter the Task:", (task)=>{
//             todos.push(task);
//             console.log("Task added:", task);
//             mainMenu();
//         })}else if(option === "2"){
//             if(todos.length === 0){
//                 console.log("\nNo tasks available.");
//             }else{
//             console.log("\nYour Todo Lists");
//             todos.forEach((task, index)=>{
//                 console.log(`${index + 1}. ${task}`)
//             })
//         }
//             mainMenu();
//         }else if(option === "3"){
//             if(todos.length === 0){
//                 console.log("\nNo tasks available to delete.");
//                 mainMenu();
//             }
//             console.log("\nYour Tasks:");
//             todos.forEach((task, index)=> console.log(`${index+1}.${task}`));
            
//             rl.question("\nEnter task number to delete:", (taskNumber)=>{
//                 const index = parseInt(taskNumber) - 1;
//                 deleteTask(index);
//                 mainMenu();
//             }
//         )
//         }else if(option === "4"){
//         console.log("Have a great day! Visit again")
//             rl.close();
//         }else{
//             console.log("Invalid option! Please choose from the list.");
//         }
// }
// mainMenu();








import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let todos = []; // Changed to let so we can reassign it in filter method

const mainMenu = () => {
    console.log("\n1. Add a task");
    console.log("2. View the tasks");
    console.log("3. Delete a task");
    console.log("4. Exit");
    rl.question("Choose an option: ", handleInputs);
};

const handleInputs = (option) => {
    if (option === "1") {
        rl.question("Enter the Task: ", (task) => {
            todos.push(task);
            console.log("Task added:", task);
            mainMenu();
        });
    } else if (option === "2") {
        if (todos.length === 0) {
            console.log("\nNo tasks available.");
        } else {
            console.log("\nYour Todo List:");
            todos.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            });
        }
        mainMenu();
    } else if (option === "3") {
        if (todos.length === 0) {
            console.log("\nNo tasks available to delete.");
            return mainMenu();
        }

        console.log("\nYour Tasks:");
        todos.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });

        rl.question("Choose task number to delete: ", (taskIndex) => {
            taskIndex = parseInt(taskIndex) - 1; // Convert input to index (0-based)

            if (taskIndex < 0 || taskIndex >= todos.length || isNaN(taskIndex)) {
                console.log("Invalid selection. Please try again.");
                return mainMenu();
            }

            rl.question("\nChoose delete method:\n1. Splice (modify array)\n2. Filter (create new array)\nEnter choice: ", (method) => {
                if (method === "1") {
                    // Using splice (Modifies the original array)
                    todos.splice(taskIndex, 1);
                    console.log("Deleted successfully ✅ (Using splice)");
                } else if (method === "2") {
                    // Using filter (Creates a new array)
                    todos = todos.filter((_, i) => i !== taskIndex);
                    console.log("Deleted successfully ✅ (Using filter)");
                } else {
                    console.log("Invalid choice.");
                }
                mainMenu();
            });
        });
    } else if (option === "4") {
        console.log("Have a great day! Visit again 😊");
        rl.close();
    } else {
        console.log("Invalid option. Choose from the given list.");
        mainMenu();
    }
};

mainMenu();
