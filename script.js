// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BETWEEN THE QUOTES BELOW:
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_WEB_APP_URL_HERE";

function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

// Top-sliding notification popup
function showTopPopup(message) {
    const existingPopup = document.getElementById("copy-toast-popup");
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement("div");
    popup.id = "copy-toast-popup";
    popup.textContent = message;

    Object.assign(popup.style, {
        position: "fixed",
        top: "-60px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#12345B",
        color: "#FFFFFF",
        padding: "12px 24px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: "9999",
        transition: "top 0.35s ease, opacity 0.35s ease",
        opacity: "0"
    });

    document.body.appendChild(popup);

    requestAnimationFrame(() => {
        popup.style.top = "24px";
        popup.style.opacity = "1";
    });

    setTimeout(() => {
        popup.style.top = "-60px";
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 350);
    }, 3000);
}

// Contact form submission to Google Sheets
const form = document.getElementById("enquiryForm");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const loan = document.getElementById("loan").value;
        const userMessage = document.getElementById("message").value.trim();
        const statusText = document.getElementById("formMessage");
        const submitBtn = form.querySelector("button[type='submit']");

        const digits = phone.replace(/\D/g, "");

        if (!name || digits.length < 10 || digits.length > 15 || !loan) {
            statusText.style.color = "#D93025";
            statusText.textContent = "Please enter valid details and select a loan type.";
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
        statusText.style.color = "#1765B5";
        statusText.textContent = "Saving your enquiry...";

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    loan: loan,
                    message: userMessage
                })
            });

            statusText.style.color = "#188038";
            statusText.textContent = "Thank you! Your enquiry has been submitted successfully.";
            showTopPopup("Enquiry submitted!");
            form.reset();
        } catch (error) {
            statusText.style.color = "#D93025";
            statusText.textContent = "Something went wrong. Please try again.";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Enquiry →";
        }
    });
}

// Top-sliding email copy popup
const emailLink = document.getElementById("email-link");

if (emailLink) {
    const emailAddress = "loan.power007@gmail.com";

    emailLink.addEventListener("click", function(event) {
        event.preventDefault();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(emailAddress).then(() => {
                showTopPopup("Email copied to clipboard!");
            });
        }
    });
}
