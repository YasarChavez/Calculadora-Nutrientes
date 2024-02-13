document.addEventListener("DOMContentLoaded", function () {
    const foodInput = document.getElementById("food-select");
    const gramsInput = document.getElementById("grams");
    const calculateBtn = document.getElementById("calculate-btn");
    const resultDiv = document.getElementById("result");

    let foods = []; // Array to store food data

    // Function to calculate nutrients based on selected food and grams
    function calculateNutrients() {
        const selectedFoodName = foodInput.value.toLowerCase();
        const selectedFoodData = foods.find((food) => food.name.toLowerCase() === selectedFoodName);
        const grams = parseFloat(gramsInput.value.replace(",", "."));
        if (selectedFoodData && !isNaN(grams) && grams > 0) {
            const calories = selectedFoodData.calories * (grams / 100);
            const protein = selectedFoodData.protein * (grams / 100);
            const carbs = selectedFoodData.carbs * (grams / 100);
            const fat = selectedFoodData.fat * (grams / 100);

            resultDiv.innerHTML = `
        <p>Calorías: ${calories.toFixed(2)}</p>
        <p>Proteínas: ${protein.toFixed(2)}</p>
        <p>Carbohidratos: ${carbs.toFixed(2)}</p>
        <p>Grasas: ${fat.toFixed(2)}</p>
      `;
        } else {
            resultDiv.textContent = "Por favor, selecciona un alimento y una cantidad válida.";
        }
    }

    // Event listener for the calculate button
    calculateBtn.addEventListener("click", calculateNutrients);

    // Fetch the JSON data
    fetch("data/foods.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            foods = data.foods;
            populateFoodList(foods);
        })
        .catch((error) => {
            console.error("There was a problem fetching the data:", error);
        });

    // Function to populate the food list datalist
    function populateFoodList(foodsData) {
        const foodList = document.getElementById("food-list");
        foodsData.forEach((food) => {
            const option = document.createElement("option");
            option.value = food.name;
            foodList.appendChild(option);
        });
    }
});
