let currentStep = 1; // Track current step

function validateForm() {
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let nextButton = document.getElementById('nextButton1');

    // Enable button only if all fields are filled
    if (name && email && phone) {
        nextButton.disabled = false; // Activate button
    } else {
        nextButton.disabled = true; // Keep button disabled
    }
}

function nextBtn() {
    let nextButton = document.getElementById('nextButton1');

    // Ensure the button is enabled before proceeding
    if (nextButton.disabled) return;

    // Move to the next step if not the last one
    if (currentStep < 4) {
        nextStep(currentStep);
        currentStep++; // Increase step count
    }
}

function nextStep(step) {
    // Hide current step
    document.getElementById(`step${step}`).classList.remove('active');
    // Show next step
    document.getElementById(`step${step + 1}`).classList.add('active');

    // Update sidebar navigation highlight
    document.getElementById(`step${step}-tab`).classList.remove('active');
    document.getElementById(`step${step + 1}-tab`).classList.add('active');

    // Disable next button again for the next step (if applicable)
    let nextButton = document.getElementById('nextButton1');
    if (nextButton) nextButton.disabled = true;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("step1").classList.add("active");
});

function prevStep(currentStep) {
    // Hide current step
    document.getElementById(`step${currentStep + 1}`).classList.remove('active');
    // Show previous step
    document.getElementById(`step${currentStep}`).classList.add('active');

    // Update sidebar
    document.getElementById(`step${currentStep + 1}-tab`).classList.remove('active');
    document.getElementById(`step${currentStep}-tab`).classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
                updateAddonPrices();
                loadSelectedPlan();
            });

            // Stores selected add-ons
            let selectedPlan = { name: "Arcade", price: 9, period: "monthly" };
let selectedAddons = {}; // Store selected add-ons

// Plan prices for both periods
const planPrices = {
    monthly: { Arcade: 9, Advanced: 12, Pro: 15 },
    yearly: { Arcade: 90, Advanced: 120, Pro: 150 }
};

// Add-on prices for both periods
const addonPrices = {
    monthly: { "Online service": 1, "Larger storage": 2, "Customizable Profile": 2 },
    yearly: { "Online service": 10, "Larger storage": 20, "Customizable Profile": 20 }
};

// Function to update the selected plan
function selectPlan(planElement, planName) {

    selectedPlan.name = planName;
    selectedPlan.price = planPrices[selectedPlan.period][planName];

    // Highlight selected plan
    document.querySelectorAll('.plan').forEach(el => el.classList.remove('active'));
    planElement.classList.add('active');

    updateSummary();
}


// Function to toggle between monthly and yearly billing
function toggleBillingPeriod() {
    selectedPlan.period = document.getElementById("billingToggle").checked ? "yearly" : "monthly";

    // Update plan pricing
    selectedPlan.price = planPrices[selectedPlan.period][selectedPlan.name];

    // Update add-on prices
    updateAddonPrices();
    updateSummary();
}

// Function to update add-on selection (without checkboxes)
function selectAddon(addonElement, addonName) {
    let checkboxIcon = addonElement.querySelector(".checkbox img");

    if (selectedAddons[addonName]) {
        // Deselect add-on
        delete selectedAddons[addonName];
        addonElement.classList.remove("selected");
        checkboxIcon.style.visibility = "hidden"; // Hide checkmark
    } else {
        // Select add-on
        selectedAddons[addonName] = addonPrices[selectedPlan.period][addonName];
        addonElement.classList.add("selected");
        checkboxIcon.style.visibility = "visible"; // Show checkmark
    }

    updateSummary();
      updateNextButton();
}

// Function to update add-on prices dynamically
function updateAddonPrices() {
    document.getElementById("price-addon1").textContent = `+$${addonPrices[selectedPlan.period]["Online service"]}/${selectedPlan.period === "monthly" ? "mo" : "yr"}`;
    document.getElementById("price-addon2").textContent = `+$${addonPrices[selectedPlan.period]["Larger storage"]}/${selectedPlan.period === "monthly" ? "mo" : "yr"}`;
    document.getElementById("price-addon3").textContent = `+$${addonPrices[selectedPlan.period]["Customizable Profile"]}/${selectedPlan.period === "monthly" ? "mo" : "yr"}`;
}

// Function to update the summary and total
function updateSummary() {

    let summaryPlan = document.getElementById("summary-plan");
    let summaryAddons = document.getElementById("summary-addons");
    let totalPrice = selectedPlan.price || 0; // Prevent NaN if undefined

    summaryPlan.innerHTML = `${selectedPlan.name} (${selectedPlan.period}) <strong>$${totalPrice}/${selectedPlan.period === "monthly" ? "mo" : "yr"}</strong>`;

    summaryAddons.innerHTML = "";
    Object.keys(selectedAddons).forEach(addon => {
        console.log(`Addon: ${addon}, Price: ${selectedAddons[addon]}`); // Debugging
        totalPrice += selectedAddons[addon] || 0;
        summaryAddons.innerHTML += `<p>${addon}: <strong>+$${selectedAddons[addon]}/${selectedPlan.period === "monthly" ? "mo" : "yr"}</strong></p>`;
    });

    document.getElementById("total-price").innerHTML = `Total (per month/year)<b>$${totalPrice}/${selectedPlan.period === "monthly" ? "mo" : "yr"}</b>`;
}

// Initialize the script when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateAddonPrices();
    updateSummary();
});



function updateNextButton() {
    const nextButton = document.getElementById("nextButton3");
    if (Object.keys(selectedAddons).length > 0) {
        nextButton.disabled = false; // Enable button
        nextButton.classList.add("enabled"); // Add styling class
    } else {
        nextButton.disabled = true; // Keep disabled if no selection
        nextButton.classList.remove("enabled");
    }
}