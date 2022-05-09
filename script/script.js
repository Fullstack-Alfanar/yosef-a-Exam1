let productArray = [];

function addProduct() {
    let nameIn = document.getElementById("nameInput");
    let priceIn = document.getElementById("priceInput");
    let typeIn = document.getElementById("typeSelect");
    let imageIn = document.getElementById("imageInput");

    let nameCheck = nameIn.value == "" || nameIn.value == null ? false : true;
    let priceCheck = priceIn.value == "" || priceIn.value == null ? false : true;
    let typeCheck = typeIn.value == "" || typeIn.value == null || typeIn.value == "Default" ? false : true;
    let imageCheck = imageIn.value == "" || imageIn.value == null ? false : true;

    if (nameCheck && priceCheck && typeCheck && imageCheck) {
        nameIn.style.borderColor = "";
        priceIn.style.borderColor = "";
        typeIn.style.borderColor = "";
        imageIn.style.borderColor = "";

        let productObj = {
            name: nameIn.value,
            price: priceIn.value,
            type: typeIn.value,
            imageURL: imageIn.value
        }

        productArray.push(productObj);

        insertToTable(productObj);

        saveLocalStorage();

        nameIn.value = "";
        priceIn.value = "";
        typeIn.value = "Default";
        imageIn.value = "";
    } else {
        if (!nameCheck) nameIn.style.borderColor = "red"; else nameIn.style.borderColor = "";
        if (!priceCheck) priceIn.style.borderColor = "red"; else priceIn.style.borderColor = "";
        if (!typeCheck) typeIn.style.borderColor = "red"; else typeIn.style.borderColor = "";
        if (!imageCheck) imageIn.style.borderColor = "red"; else imageIn.style.borderColor = "";
    }

}

function insertToTable(productObj) {

    let nameLabel = document.createElement("label");
    let priceLabel = document.createElement("label");
    let typeLabel = document.createElement("label");
    let productImage = document.createElement("img");
    let removeBtn = document.createElement("input");

    let nameTd = document.createElement("td");
    let priceTd = document.createElement("td");
    let typeTd = document.createElement("td");
    let imageTd = document.createElement("td");
    let removeTd = document.createElement("td");

    let tr = document.createElement("tr");

    let tableBody = document.getElementById("tableBody");

    nameLabel.textContent = productObj.name;
    priceLabel.textContent = productObj.price;
    typeLabel.textContent = productObj.type;
    productImage.src = productObj.imageURL;

    removeBtn.type = "button";
    removeBtn.value = "remove";
    removeBtn.addEventListener("click", () => {
        let deleteIndex = productArray.findIndex((val, index, obj) => {
            if ((val.name == productObj.name) &&
                (val.price == productObj.price) &&
                (val.type == productObj.type) &&
                (val.imageURL == productObj.imageURL)) return true;
        });
        productArray.splice(deleteIndex, 1,);

        saveLocalStorage();
        tr.remove();
    });


    nameTd.appendChild(nameLabel);
    priceTd.appendChild(priceLabel);
    typeTd.appendChild(typeLabel);
    imageTd.appendChild(productImage);
    removeTd.appendChild(removeBtn);


    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(typeTd);
    tr.appendChild(imageTd);
    tr.appendChild(removeTd);



    tableBody.appendChild(tr);
}

function saveLocalStorage() {
    localStorage.setItem("productsList", JSON.stringify(productArray));
}

function fetchLocalStorage() {
    if (localStorage.getItem("productsList")) {
        productArray = JSON.parse(localStorage.getItem("productsList"));
        for (const prod of productArray) {
            insertToTable(prod);
        }
    }
}

fetchLocalStorage();