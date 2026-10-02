// -----------------------------
// Animated particles
// -----------------------------

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 35; i++) {

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    particle.style.animationDelay =
        Math.random() * 8 + "s";

    particle.style.animationDuration =
        5 + Math.random() * 7 + "s";

    particleContainer.appendChild(particle);
}


// -----------------------------
// Form
// -----------------------------

const form = document.getElementById("demoForm");

const successMessage =
    document.getElementById("successMessage");

const successText =
    document.getElementById("successText");

const resetButton =
    document.getElementById("resetButton");

const dateInput =
    document.getElementById("demoDate");


// Prevent selecting dates in the past

const today = new Date();

const yyyy = today.getFullYear();

const mm = String(today.getMonth() + 1)
    .padStart(2, "0");

const dd = String(today.getDate())
    .padStart(2, "0");

dateInput.min = `${yyyy}-${mm}-${dd}`;


// -----------------------------
// Submit
// -----------------------------

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton =
        document.getElementById("submitButton");

    const name =
        document.getElementById("name").value.trim();

    const date =
        dateInput.value;

    if (!name || !date) {
        return;
    }

    submitButton.disabled = true;

    submitButton.innerHTML =
        "Sending...";


    try {

        const response = await fetch(
            form.action,
            {
                method: "POST",

                body: new FormData(form),

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {

            const readableDate =
                new Date(
                    date + "T00:00:00"
                ).toLocaleDateString(
                    undefined,
                    {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );


            successText.textContent =
                `Thanks, ${name}! Your requested demo date is ${readableDate}.`;

            form.style.display = "none";

            successMessage.style.display =
                "block";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            throw new Error(
                "Form submission failed."
            );

        }

    } catch (error) {

        alert(
            "Something went wrong. Please try again."
        );

        submitButton.disabled = false;

        submitButton.innerHTML =
            '<span>Schedule the demo</span><span class="arrow">→</span>';
    }
});


// -----------------------------
// Reset
// -----------------------------

resetButton.addEventListener(
    "click",
    function () {

        form.reset();

        form.style.display = "block";

        successMessage.style.display =
            "none";

        dateInput.min =
            `${yyyy}-${mm}-${dd}`;
    }
);