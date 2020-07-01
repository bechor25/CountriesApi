"use strict";
$(() => {
    // ----- get all countries ------- //
    //--- print all countries to html --- //
    $("#allCountries").click(() => {
        getAjax("https://restcountries.eu/rest/v2/all", success => {
            for (const country of success) {
                createCard(country);
            }

        }, err => {
            alert(err.massage);
        });
    });
    // --- function for ajax --- //
    function getAjax(url, response, err) {
        $.ajax({
            method: "GET",
            url: url,
            success: response,
            error: err
        });
    }
    //--- create card --- //
    function createCard(callback) {
        const card = `
    <div class="card col-sm-6 col-md-3 col-lg-2 justify-content-center bg-light" id="card">
    <img src="${callback.flag}" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text" id="cssName">${callback.name}</p>
    <p class="card-text"><span style="color:cornflowerblue;">Domain:</span>  ${callback.topLevelDomain}</p>
    <p class="card-text"><span style="color:cornflowerblue;">Capital:</span> ${callback.capital}</p>
    <p class="card-text"><span style="color:cornflowerblue;">Code:</span> ${callback.currencies[0].code}</p>
    <p class="card-text"><span style="color:cornflowerblue;">Name:</span> ${callback.currencies[0].name}</p>
    <p class="card-text"><span style="color:cornflowerblue;">Symbol:</span> ${callback.currencies[0].symbol}</p>
    </div>
    </div>
        `;
        $(".row").append(card);
    }
    // ----- Search ----- //
    $("#searchButt").click(() => {
        const val = $("#searchCountries").val();
        $(".row").html("");
        if (val.length === 0 || !isNaN(val)) {
            alert("please enter value / proper value .")
        } else {
            getAjax("https://restcountries.eu/rest/v2/name/" + val, response => {
                for (const country of response) {
                    createCard(country);
                }
            }, err => {
                alert("Try again cannot found the country");
            });
        }
    });
});