//Variables 
const car = document.querySelector("#car");
const boxCar = document.querySelector("#car-list tbody");
const cleanCarBtn = document.querySelector("#clean-car")
const phoneList = document.querySelector("#phones-list");
const filter = document.querySelector("#filter");

let phonesInCar = [];

loadEvents();

function loadEvents () {
    //Add a phones
    phoneList.addEventListener("click", addPhone);

    //Delete phones
    car.addEventListener("click", deletePhone);

    //Cleand phones
    cleanCarBtn.addEventListener("click", cleanPhones);

}

//Funtions
function addPhone (e) {
    e.preventDefault();
    if( e.target.classList.contains("addCart") ) {
        const phoneSelected = e.target.parentElement.parentElement;
        readPhoneInfo(phoneSelected);
    }
    colorCar();
}

//Delete a Phone
function deletePhone (e) {
    if( e.target.classList.contains("clean-phone")) {
        const phoneId = e.target.getAttribute("data-id");
        phonesInCar = phonesInCar.filter( phone => phone.id !== phoneId);
        carHTML();
    }
    colorCar();
}

//Clean the shopping car
function cleanPhones (e) {
    if(e.target.classList.contains("clean-car")) {
        phonesInCar = [];
        carHTML();
    }
    colorCar();
}

//Read the phone info
function readPhoneInfo (phone) {
    //Make an object
    const infoPhone = {
        image: phone.querySelector("img").src,
        title: phone.querySelector("h3").textContent,
        price: phone.querySelector(".price span").textContent,
        id: phone.querySelector("a").getAttribute("data-id"),
        quantity: 1,
    }

    //An element is in the car?
    const isHere = phonesInCar.some( phone => phone.id === infoPhone.id)
    if(isHere) {
        const phones = phonesInCar.map((phone) => {
            if(phone.id === infoPhone.id) {
                phone.quantity++;
                return phone;  //return the repeated objects
            } else {
                return phone; // return the NOT repeated objects
            }
        })
        phonesInCar = [...phones];
    } else {
        //Add elements to car
        phonesInCar = [...phonesInCar, infoPhone];
    }

    carHTML();

}

//Show the phones in the car
function carHTML () {

    // clean HTML
    cleanHTML();

    phonesInCar.map( (phone) => {
        const { title, image, price, quantity, id } = phone;
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>
                <img class="w-32 m-auto" src="${image}">
            </td>
            <td class="text-center">${title}</td>
            <td class="text-center">${price}</td>
            <td class="text-center">${quantity}</td>
            <td class="text-center">
                <a href="#" class="clean-phone" data-id=${id}> X </a>
            </td>
        `;

        //Add the HTML to the tbody
        boxCar.appendChild(row);

    })
}

function colorCar () {
    if(Object.entries(phonesInCar).length === 0) {
        filter.classList.remove("noFilter");
    } 
    if(Object.entries(phonesInCar).length !== 0) {
        filter.classList.add("noFilter");
    }  

}

//Eliminar los cursos del tbody
function cleanHTML () {
    while(boxCar.firstChild) {
        boxCar.removeChild(boxCar.firstChild);
    }
}