document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs";
    const tableBody = document.querySelector("#table-body");
    fetchDogs();
    // const tr = document.createElement("tr");
    // tableBody.appendChild(tr);

    function fetchDogs() {
        fetch(dogsUrl)
            .then(resp => resp.json())
            .then(data => {
                data.forEach(dog => addDog(dog));
            })
    }

    function addDog(dog) {
        const tr = document.createElement("tr");
        const name = document.createElement("td");
        const breed = document.createElement("td");
        const sex = document.createElement("td");
        const buttonTd = document.createElement("td");
        const button = document.createElement("button");

        tableBody.appendChild(tr);
        tr.appendChild(name);
        tr.appendChild(breed);
        tr.appendChild(sex);
        tr.appendChild(buttonTd);
        buttonTd.appendChild(button);

        name.textContent = dog.name;
        breed.textContent = dog.breed;
        sex.textContent = dog.sex;
        button.textContent = "Edit";
        button.addEventListener("click", () => editDog(dog))
    }

    function editDog(dog) {
        const form = document.querySelector("#dog-form");
        form.name.value = dog.name;
        form.breed.value = dog.breed;
        form.sex.value = dog.sex;

        form.addEventListener("submit", event => {
            updateDog(form.name.value, form.breed.value, form.sex.value, dog.id);
        })
        
    }

    function updateDog(name, breed, sex, id) {
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "breed": breed,
                "sex": sex
            })
        })
            .then(resp => resp.json())
            .then(data => fetchDogs())

    }
})