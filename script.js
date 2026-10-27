/*jslint browser*/
(function () {
    "use strict";

    var prices = {
        basic: 1000,
        print: 500,
        delivery: 800,
        options: {
            standard: 0,
            urgent: 300,
            premium: 700
        },
        insurance: 200
    };

    function getSelectedType() {
        var selected = document.querySelector(
            'input[name="service-type"]:checked'
        );

        return selected.value;
    }

    function getQuantity() {
        var quantityInput = document.getElementById("quantity");
        var error = document.getElementById("quantity-error");
        var value = quantityInput.value.trim();
        var quantity;

        if (!/^\d+$/.test(value)) {
            error.textContent = "Введите целое положительное число.";
            return null;
        }

        quantity = parseInt(value, 10);

        if (quantity < 1) {
            error.textContent = "Количество должно быть больше нуля.";
            return null;
        }

        error.textContent = "";
        return quantity;
    }

    function updateExtraControls(type) {
        var optionBlock = document.getElementById("option-block");
        var propertyBlock = document.getElementById("property-block");

        optionBlock.hidden = type !== "print";
        propertyBlock.hidden = type !== "delivery";
    }

    function calculatePrice() {
        var quantity = getQuantity();
        var type = getSelectedType();
        var optionSelect = document.getElementById("service-option");
        var insurance = document.getElementById("insurance");
        var result = document.getElementById("total-price");
        var unitPrice;
        var total;

        updateExtraControls(type);

        if (quantity === null) {
            result.textContent = "—";
            return;
        }

        unitPrice = prices[type];

        if (type === "print") {
            unitPrice += prices.options[optionSelect.value];
        }

        if (type === "delivery" && insurance.checked) {
            unitPrice += prices.insurance;
        }

        total = unitPrice * quantity;
        result.textContent = total + " ₽";
    }

    window.addEventListener("DOMContentLoaded", function () {
        var quantityInput = document.getElementById("quantity");
        var typeRadios = document.querySelectorAll(
            'input[name="service-type"]'
        );
        var optionSelect = document.getElementById("service-option");
        var insurance = document.getElementById("insurance");

        quantityInput.addEventListener("input", calculatePrice);

        typeRadios.forEach(function (radio) {
            radio.addEventListener("change", calculatePrice);
        });

        optionSelect.addEventListener("change", calculatePrice);
        insurance.addEventListener("change", calculatePrice);

        calculatePrice();
    });
}());
