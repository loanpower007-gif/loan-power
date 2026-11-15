function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

// Contact form
const form = document.getElementById("enquiryForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const loan = document.getElementById("loan").value;
        const message = document.getElementById("formMessage");

        const digits = phone.replace(/\D/g, "");

        if (!name || digits.length < 10 || digits.length > 15 || !loan) {
            message.textContent =
                "Please enter valid details and select a loan type.";
            return;
        }

        message.textContent =
            "Your details are valid! The enquiry form is not connected to a submission service yet.";

        form.reset();
    });
}

// Top-sliding email copy popup
const emailLink = document.getElementById("email-link");

if (emailLink) {
    const emailAddress = "loan.power007@gmail.com";

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
        }, 2500);
    }

    emailLink.addEventListener("click", function(event) {
        event.preventDefault();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(emailAddress).then(() => {
                showTopPopup("Email copied to clipboard!");
            });
        }
    });
}
