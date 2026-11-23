const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Website enquiry: ${formData.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\n` +
    `Email: ${formData.get("email")}\n` +
    `Service: ${formData.get("service")}\n\n` +
    `Project details:\n${formData.get("message")}`
  );

  // Replace this placeholder with the business email before publishing.
  const businessEmail = "YOUR_BUSINESS_EMAIL@example.com";

  if (businessEmail === "YOUR_BUSINESS_EMAIL@example.com") {
    formNote.textContent = "The form is working, but the business email is still a placeholder. Update businessEmail in script.js before using the enquiry feature.";
    formNote.classList.add("form-warning");
    return;
  }

  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
});
