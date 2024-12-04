const employeeList = [];
let idCounter = 1;

const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");
const addEmployeeBtn = document.getElementById("add-employee-btn");
const message = document.getElementById("message");
const employeeListContainer = document.getElementById("employee-list");
const defaultView = document.getElementById("default-view");

// Function to display message
function displayMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

// Function to load employees
function renderEmployees() {
  if (employeeList.length === 0) {
    defaultView.style.display = "block";
  } else {
    defaultView.style.display = "none";
  }

  employeeListContainer.innerHTML = employeeList
    .map(
      (employee) => `
      <div class="employee-card" id="employee-${employee.id}">
        <p>${employee.id}. ${employee.name} (${employee.profession}, ${employee.age})</p>
        <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
      </div>
    `
    )
    .join("");
}

// Function to add an employee
addEmployeeBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = ageInput.value.trim();

  if (!name || !profession || !age) {
    displayMessage("Error: All fields are required!", "error");
    return;
  }

  const newEmployee = {
    id: idCounter++,
    name,
    profession,
    age: Number(age),
  };

  employeeList.push(newEmployee);
  renderEmployees();
  displayMessage("Success: Employee added successfully!", "success");

  nameInput.value = "";
  professionInput.value = "";
  ageInput.value = "";
});

// Employee Delete
function deleteEmployee(id) {
  const index = employeeList.findIndex((employee) => employee.id === id);
  if (index !== -1) {
    employeeList.splice(index, 1);
    renderEmployees();
    displayMessage("Employee deleted successfully!", "success");
  }
}

// Initial rendering
renderEmployees();
