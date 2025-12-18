const userId = localStorage.getItem("userId");

if (!userId) {
    alert("Please login first");
    window.location = "login.html";
}

const API = "http://localhost:3000/api/expenses";

/* TAB HANDLING */
function showTab(tab) {
    document.getElementById("addTab").style.display =
        tab === "add" ? "block" : "none";

    document.getElementById("viewTab").style.display =
        tab === "view" ? "block" : "none";

    if (tab === "view") {
        loadExpenses();   // ✅ ALWAYS LOAD
    }
}

/* ADD EXPENSE */
function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) {
        alert("Please fill all fields");
        return;
    }

    fetch(`${API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: userId,
            title: title,
            amount: amount,
            category: category,
            expense_date: date
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Expense added successfully ✅");
        clearForm();
        showTab("view");   // ✅ SWITCH + LOAD
    })
    .catch(err => console.error("Add error:", err));
}

/* LOAD EXPENSES */
function loadExpenses() {
    fetch(`${API}/user/${userId}`)
        .then(res => res.json())
        .then(data => {
            const expenseList = document.getElementById("expenseList");
            expenseList.innerHTML = "";

            if (!data || data.length === 0) {
                expenseList.innerHTML = "<li>No expenses found</li>";
                return;
            }

            data.forEach(e => {
                expenseList.innerHTML += `
                    <li>
                        <span>
                            <strong>${e.title}</strong><br>
                            ₹${e.amount} | ${e.category} | ${e.expense_date}
                        </span>
                        <button class="delete" onclick="deleteExpense(${e.id})">❌</button>
                    </li>
                `;
            });
        })
        .catch(err => console.error("Load error:", err));
}

/* DELETE EXPENSE */
function deleteExpense(id) {
    fetch(`${API}/delete/${id}/${userId}`, {
        method: "DELETE"
    })
    .then(() => loadExpenses())
    .catch(err => console.error("Delete error:", err));
}

/* UTILITIES */
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

function logout() {
    localStorage.clear();
    window.location = "login.html";
}

/* DEFAULT TAB */
showTab("add");
