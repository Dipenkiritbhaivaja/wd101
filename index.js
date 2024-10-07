// user can only enter dob between 18 and 55 age from the current date
const todayDate = new Date()

const maxDate = new Date(todayDate.getFullYear() - 18, todayDate.getMonth(), todayDate.getDate());

const minDate = new Date(todayDate.getFullYear() - 55, todayDate.getMonth(), todayDate.getDate());

const formatDate = (date) => {
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

document.getElementById('dob').setAttribute('min', formatDate(minDate))
document.getElementById('dob').setAttribute('max', formatDate(maxDate))

// retrieving entries from localstorage
const retriveEntry = () => {
    let entries = localStorage.getItem('user-entries');
    if (entries)
        return JSON.parse(entries)
    else
        return []
}

// saving User data to local storage
let userForm = document.getElementById('user-form');
let userEntries = retriveEntry();
const saveUserData = (event) => {
    event.preventDefault()
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let acceptedTerms = document.getElementById('checkedTerms').checked;

    let entry = {
        name,
        email,
        pass,
        dob,
        acceptedTerms
    }
    userEntries.push(entry)
    localStorage.setItem('user-entries', JSON.stringify(userEntries))
    insertRow();
}
userForm.addEventListener('submit', saveUserData)

// adding user entry to table as a row
let insertRow = () => {
    let table = document.getElementById('user-entry-table')
    let entries = retriveEntry()

    table.innerHTML = `<tr>
        <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr > `

    entries.forEach((entry) => {

        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.pass}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTerms}</td>
        `;

        table.appendChild(row)
    })
}

insertRow();
