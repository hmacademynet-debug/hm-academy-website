/* ─── NAVBAR SCROLL ──────────────────────────────────── */
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 20);
});

/* ─── HAMBURGER ──────────────────────────────────────── */
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("open");
});
function closeMobileMenu() {
  document.getElementById("mobile-menu").classList.remove("open");
}

/* ─── FADE IN ON SCROLL ──────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

/* ─── SUMMER COURSES POPUP ──────────────────────────── */
const courseModal = document.getElementById("course-modal");
const courseModalBody = document.getElementById("course-modal-body");
const summerCourses = document.querySelector('[data-tab="summer"]');

function openCourseModal() {
  if (!courseModal || !courseModalBody || !summerCourses) return;

  if (!courseModalBody.firstElementChild) {
    const clonedSummerCourses = summerCourses.cloneNode(true);
    clonedSummerCourses.removeAttribute("data-tab");
    clonedSummerCourses.classList.remove("fade-up");
    clonedSummerCourses.classList.add("active");
    courseModalBody.appendChild(clonedSummerCourses);
  }

  courseModal.classList.add("open");
  courseModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeCourseModal() {
  if (!courseModal) return;

  courseModal.classList.remove("open");
  courseModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

courseModal?.addEventListener("click", (event) => {
  if (event.target.closest("[data-modal-close]")) {
    closeCourseModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCourseModal();
  }
});

window.setTimeout(openCourseModal, 1000);

/* ─── COURSE TABS ────────────────────────────────────── */
function switchTab(name, btn) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll("[data-tab]")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  document.querySelector(`[data-tab="${name}"]`).classList.add("active");
}
function openSummerTab() {
  setTimeout(() => {
    const summerBtn = document.querySelectorAll(".tab-btn")[1];
    switchTab("summer", summerBtn);
  }, 300);
}

/* ─── FAQ ────────────────────────────────────────────── */
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".faq-item")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

/* ─── TESTIMONIAL DOTS ───────────────────────────────── */
const track = document.getElementById("testiTrack");
const nav = document.getElementById("testiNav");
const cards = track.querySelectorAll(".testi-card");
cards.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "testi-dot" + (i === 0 ? " active" : "");
  dot.onclick = () => {
    track.scrollTo({ left: cards[i].offsetLeft - 24, behavior: "smooth" });
  };
  nav.appendChild(dot);
});
track.addEventListener("scroll", () => {
  const scrollLeft = track.scrollLeft;
  let active = 0;
  cards.forEach((c, i) => {
    if (c.offsetLeft - 24 <= scrollLeft + 10) active = i;
  });
  nav
    .querySelectorAll(".testi-dot")
    .forEach((d, i) => d.classList.toggle("active", i === active));
});

/* ─── DEMO FORM ──────────────────────────────────────── */
function submitDemoForm(e) {
  e.preventDefault();
  const name = document.getElementById("d-name").value;
  const phone = document.getElementById("d-phone").value;
  const email = document.getElementById("d-email").value;
  const course = document.getElementById("d-course").value;

  // Build WhatsApp message
  const msg = `🎓 *New Free Demo Booking – HM Academy*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email || "Not provided"}\n📚 Course: ${course}`;
  const waUrl = `https://wa.me/919342203251?text=${encodeURIComponent(msg)}`;

  // Send via mailto as backup (owner email)
  const mailBody = `New Free Demo Booking\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "Not provided"}\nCourse: ${course}`;
  const mailUrl = `mailto:hmacademy.net@gmail.com?subject=New Demo Booking - ${name}&body=${encodeURIComponent(mailBody)}`;

  // Open WA notification for owner
  window.open(waUrl, "_blank");

  // Show success
  document.getElementById("demo-form-wrap").style.display = "none";
  document.getElementById("demo-success").style.display = "block";
}

/* ─── ENQUIRY FORM ───────────────────────────────────── */
function submitEnquiryForm(e) {
  e.preventDefault();
  const name = document.getElementById("e-name").value;
  const phone = document.getElementById("e-phone").value;
  const email = document.getElementById("e-email").value;
  const course = document.getElementById("e-course").value;
  const msg2 = document.getElementById("e-msg").value;

  const waMsg = `📩 *New Enquiry – HM Academy*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email || "Not provided"}\n📚 Course: ${course || "Not specified"}\n\n💬 Message:\n${msg2}`;
  const waUrl = `https://wa.me/919342203251?text=${encodeURIComponent(waMsg)}`;
  window.open(waUrl, "_blank");

  document.getElementById("enquiry-form-wrap").style.display = "none";
  document.getElementById("enquiry-success").style.display = "block";
}
