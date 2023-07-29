if (Window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

let changeEvent = new Event("change");

document.querySelectorAll(".dropdown").forEach(dropdown => {
    let button = dropdown.querySelector(".dropdown__button");
    let currentValueElement = dropdown.querySelector(".dropdown__value");
    let options = dropdown.querySelector(".dropdown__options");

    let setOptionPreview = function(option) {
        currentValueElement.innerHTML = option.innerHTML;
    }

    let setOption = function(option, mustDispatchEvent = true) {
        setOptionPreview(option);
        
        if (dropdown.dataset.value == option.dataset.value) return;
        dropdown.dataset.value = option.dataset.value;
        
        if (!mustDispatchEvent) return;
        dropdown.dispatchEvent(changeEvent);
    }

    button.addEventListener("click", function (e) {
        e.stopPropagation();
        options.classList.toggle("dropdown__options--visible");
    });

    options.querySelectorAll(".dropdown__option").forEach(option => {
        option.addEventListener("click", function (e) {
            if (option.attributes.disabled != undefined) {
                e.stopPropagation();
                return;
            }
            
            options.classList.remove("dropdown__options--visible");
            setOption(option);
        });
    });

    // button.addEventListener("focusout", (e) => {
    //     e.preventDefault();
    //     options.classList.remove("dropdown__options--visible")
    // })
    
    let isOptionSelected = false;

    for (var child of options.children) {
        if (child.attributes.selected == undefined) continue;
        setOption(child, false);
        isOptionSelected = true;
    }

    if (isOptionSelected) return;
    
    for (var child of options.children) {
        if (child.attributes.disabled != undefined) continue;
        setOption(child, false);
        return;
    }
});

document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown__options").forEach(options => {
        options.classList.remove("dropdown__options--visible");
    });
});
