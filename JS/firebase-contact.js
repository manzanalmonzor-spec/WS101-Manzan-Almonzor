// Contact form — FormSubmit.co AJAX (activated via email confirmation)

const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

function resetContactForm() {
  contactForm.classList.remove("hide");
  contactSuccess.classList.remove("show");
  contactForm.reset();
  const btn = contactForm.querySelector(".btn-submit");
  btn.disabled = false;
  btn.querySelector(".btn-submit-text").textContent = "Send Message";
}

window.resetContactForm = resetContactForm;

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector(".btn-submit");
  const btnText = btn.querySelector(".btn-submit-text");
  btn.disabled = true;
  btnText.textContent = "Sending…";

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const body = new FormData();
  body.append(
    "_subject",
    `[TechWizards Inquiry] ${service} — ${fname} ${lname}`,
  );
  body.append("_captcha", "false");
  body.append("_template", "box");
  body.append("name", `${fname} ${lname}`);
  body.append("email", email);
  body.append("service", service);
  body.append("message", message);

  try {
    const res = await fetch(
      "https://formsubmit.co/ajax/techwizards42026@gmail.com",
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      },
    );
    const json = await res.json();

    if (json.success === "true" || json.success === true) {
      contactForm.classList.add("hide");
      contactSuccess.classList.add("show");
    } else {
      throw new Error("FormSubmit returned failure");
    }
  } catch {
    btn.disabled = false;
    btnText.textContent = "Send Message";
    alert(
      "Could not send. Please email us directly: techwizards42026@gmail.com",
    );
  }
});

document
  .getElementById("sendAnother")
  ?.addEventListener("click", resetContactForm);
