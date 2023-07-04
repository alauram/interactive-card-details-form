const cardNumber = document.querySelector(".card-number");
const cardName = document.querySelector(".card-name");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const cvc = document.querySelector(".cvc");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");
const submitBtn = document.querySelector(".submit");
const form = document.querySelector(".infos");
const nameError = document.querySelector(".error-name");
const numberError = document.querySelector(".error-number");
const monthError = document.querySelector(".error-month");
const yearError = document.querySelector(".error-year");
const cvcError = document.querySelector(".error-cvc");
const allErrors = document.querySelectorAll(".error");
const continueBtn = document.querySelector(".continue");
const sucess = document.querySelector(".sucess")
nameInput.addEventListener("input", function () {
    const input = nameInput.value;
    if (!input) {
        cardName.innerHTML = "Jane Appleseed";
    } else {
        if (input.match(/^.{0,30}$/gm)) {
            cardName.innerHTML = input;
        }
    }
});

numberInput.addEventListener("input", function (e) {
    let input = numberInput.value;
    if (!input) {
        cardNumber.innerHTML = "0000 0000 0000 0000";
    } else {
        let field = e.target;
        let position = field.selectionEnd;
        let length = field.value.length;

        field.value = field.value
            .replace(/[^\da-zA-Z&é"'(§è!çà)-]/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();

        cardNumber.innerHTML = field.value;

        field.selectionEnd = position +=
            field.value.charAt(position - 1) === " " &&
            field.value.charAt(length - 1) === " "
                ? 1
                : 0;
    }
});

monthInput.addEventListener("input", function () {
    let input = monthInput.value;
    if (!input) {
        month.innerHTML = "00";
    } else {
        if (input.match(/^.{0,1}$/gm)) {
            month.innerHTML = "0" + input;
        } else {
            if (input > 11) {
                month.innerHTML = "12";
                monthInput.value = "12";
            } else {
                month.innerHTML = input;
            }
        }
    }
});

yearInput.addEventListener("input", function () {
    let input = yearInput.value;
    if (!input) {
    year.innerHTML = "00";
    } else {
        if (input.match(/^.{0,1}$/gm)) {
        year.innerHTML = "0" + input;
        } else {
        year.innerHTML = input;
        }
    }
});

cvcInput.addEventListener("input", function () {
    const input = cvcInput.value;
    if (!input) {
        cvc.innerHTML = "000";
    } else {
        if (input.match(/^.{0,3}$/gm)) {
            cvc.innerHTML = input;
        }
    }
});

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    for (let i = 0; i < allErrors.length; i++) {
        allErrors[i].classList.remove("error");
    }
    let valueName = nameInput.value;
    let valueNumber = numberInput.value;
    let valueMonth = monthInput.value;
    let valueYear = yearInput.value;
    let valueCvc = cvcInput.value;

    const nameRegex = valueName.match(
        /^(?:[a-zA-Záéíóúü\.]{2,30}\s?){1,6}$/gm
    );
    const numberRegex = valueNumber.match(
        /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g
    );
    const monthRegex = valueMonth.match(/^(0?[1-9]|1[012])$/g);
    const yearRegex = valueYear.match(/^\d{1,2}$/g);
    const cvcRegex = valueCvc.match(/^\d{3}$/g);

    if (nameRegex && numberRegex && monthRegex && yearRegex && cvcRegex) {
        sucess.style.display = "flex";
        form.style.visibility = "hidden";    
    } else {
        if (!nameRegex) {
            nameInput.classList.add("error")
            nameError.innerHTML = "Please enter a valid name"
        }
        if (!numberRegex) {
            numberError.innerHTML = "";
            numberInput.classList.add("error");
            if (!valueNumber.match(/^.{19}$/gm)) {
                numberError.innerHTML = "16 numbers are needed";
            } else {
                numberError.innerHTML = "Wrong format, numbers only";
            }
        }
        if (!monthRegex) {
            monthError.innerHTML = "";
            monthInput.classList.add("error");
            if (valueMonth == "0" || valueMonth == "00") {
                monthError.innerHTML = "Must be greater than 0";
            }
            if (!valueMonth.match(/^\d$/g)) {
                if (!valueMonth) {
                    monthInput.classList.add("error")
                    monthError.innerHTML=  "Can't be blank";
                } else {
                    monthError.innerHTML = "Numbers only";
                }
            }
        }

        if (!yearRegex) {
            yearError.innerHTML = "";
            yearInput.classList.add("error")
            if (!valueYear.match(/^\d$/g)) {
                if (!valueYear) {
                    yearError.innerHTML = "Can't be blank";
                } else {
                    yearError.innerHTML = "Numbers only";
                }
            }
        }
        if (!cvcRegex) {
            cvcError.innerHTML = "";
            cvcInput.classList.add("error");
            if (!valueCvc.match(/^\d$/g)) {
                if (!valueCvc) {
                    cvcError.innerHTML = "Can't be blank";
                } else {
                    cvcError.innerHTML = "Numbers only";
                }
            }
        }
    }
});
continueBtn.addEventListener("click", () => {
    form.reset()
    cardName.innerText = "Jane Appleseed";
    cardNumber.innerText = "0000 0000 0000 0000";
    month.innerHTML = "00";
    year.innerHTML = "00";
    cvc.innerText = "000";
    form.style.visibility= "visible";
    sucess.style.display = "none";
    nameError.innerHTML = "";
    numberError.innerHTML = "";
    yearError.innerHTML = "";
    monthError.innerHTML= "";
    cvcError.innerHTML="";
    nameInput.classList.remove("error");
    numberInput.classList.remove("error");
    monthInput.classList.remove("error");
    yearInput.classList.remove("error");
    cvcInput.classList.remove("error");
});
