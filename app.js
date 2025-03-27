import chalk from "chalk";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let todos = []; // Changed to let so we can reassign it in filter method

const mainMenu = () => {
    console.log(chalk.bgGreenBright("\n1. Add a task"));
    console.log(chalk.bgGreenBright("2. View the tasks"));
    console.log(chalk.bgGreenBright("3. Delete a task"));
    console.log(chalk.bgGreenBright("4. Exit"));
    rl.question(chalk.bgCyan("Choose an option: ")+" ", handleInputs);
};

const handleInputs = (option) => {
    if (option === "1") {
        rl.question(chalk.bgCyan("Enter the Task: ")+" ", (task) => {
            todos.push(task);
            console.log(chalk.green("Task added:", task));
            mainMenu();
        });
    } else if (option === "2") {
        if (todos.length === 0) {
            console.log(chalk.redBright("\nNo tasks available."));
        } else {
            console.log(chalk.blue("\nYour Todo List:"));
            todos.forEach((task, index) => {
                console.log(chalk.green(`${index + 1}. ${task}`));
            });
        }
        mainMenu();
    } else if (option === "3") {
        if (todos.length === 0) {
            console.log(chalk.red("\nNo tasks available to delete."));
            return mainMenu();
        }

        console.log(chalk.blue("\nYour Tasks:"));
        todos.forEach((task, index) => {
            console.log(chalk.green(`${index + 1}. ${task}`));
        });

        rl.question(chalk.bgCyan("Choose task number to delete: ")+" ", (taskIndex) => {
            taskIndex = parseInt(taskIndex) - 1; // Convert input to index (0-based)

            if (taskIndex < 0 || taskIndex >= todos.length || isNaN(taskIndex)) {
                console.log(chalk.red("Invalid selection. Please try again."));
                return mainMenu();
            }

            rl.question(chalk.bgCyan("\nChoose delete method:\n1. Splice (modify array)\n2. Filter (create new array)\nEnter choice: ")+" ", (method) => {
                if (method === "1") {
                    // Using splice (Modifies the original array)
                    todos.splice(taskIndex, 1);
                    console.log(chalk.green("Deleted successfully ✅ (Using splice)"));
                } else if (method === "2") {
                    // Using filter (Creates a new array) only we have to assign todos variable with let not with const becasue filter reassign the array after edit because of const it won't be possible.
                    todos = todos.filter((_, i) => i !== taskIndex);
                    console.log(chalk.green("Deleted successfully ✅ (Using filter)"));
                } else {
                    console.log(chalk.red("Invalid choice."));
                }
                mainMenu();
            });
        });
    } else if (option === "4") {
        console.log(chalk.yellow("Have a great day! Visit again 😊"));
        rl.close();
    } else {
        console.log(chalk.red("Invalid option. Choose from the given list."));
        mainMenu();
    }
};

mainMenu();
