const responses = {
  loan: [
    "We offer personal, home, and business loans at attractive interest rates!",
    "Loan processing is fast & paperless with us!",
    "Need a loan? Just visit your nearest branch or apply online.",
    "EMI options available for all loan types.",
    "Check loan eligibility on our website today!",
    "Ask us about our zero prepayment penalty loans.",
    "Loan approvals within 24 hours for eligible profiles.",
    "Special rates for women & senior citizens!",
    "Your dream loan is just a step away.",
    "Apply now and enjoy flexible repayment plans!"
  ],
  fd: [
    "Our Fixed Deposits offer up to 7.5% interest!",
    "Choose from flexible tenures between 7 days to 10 years.",
    "Interest can be received monthly, quarterly, or at maturity.",
    "Start an FD online in minutes!",
    "Senior citizens get additional 0.5% interest.",
    "Safe and secure returns with Eluri Bank FDs.",
    "No penalty on premature withdrawal after 6 months.",
    "Open an FD with just ₹1,000!",
    "Earn more on idle savings with an FD today.",
    "Visit any branch or apply online to start your FD."
  ],
  savings: [
    "Open a savings account with zero balance.",
    "Enjoy free ATM withdrawals & mobile banking.",
    "Track your savings through our smart app.",
    "Start saving with just ₹100!",
    "Set savings goals and we’ll help you meet them.",
    "Auto-sweep your balance to earn more!",
    "Savings account with free insurance cover!",
    "Paperless account opening available online.",
    "Earn up to 4% interest on your balance.",
    "Switch to Eluri and experience smart saving."
  ],
  locker: [
    "We provide safe deposit lockers at all branches.",
    "Lockers come in Small, Medium, and Large sizes.",
    "Locker facility available for both individuals & firms.",
    "Minimal annual charges, complete security.",
    "Nomination facility available on lockers.",
    "E-locker access alerts sent to your phone.",
    "Visit the branch to check availability.",
    "Get peace of mind with our secure lockers.",
    "Locker allocation done on priority for savings account holders.",
    "Special offers for long-term locker holders."
  ],
  marriage: [
    "We offer Marriage Loans at low interest rates.",
    "Plan your dream wedding stress-free!",
    "Our advisors help with marriage budgeting too!",
    "Marriage savings plans with assured returns.",
    "Get financial planning support for weddings.",
    "Special gold loan schemes for marriage expenses.",
    "Apply jointly for better eligibility.",
    "Flexible repayment options tailored to weddings.",
    "Pre-approved marriage loans for select customers.",
    "Contact us today for our marriage loan offers!"
  ],
  food: [
    "Don’t forget to take lunch breaks while banking smartly!",
    "We recommend financial meals — savings, investments, returns!",
    "Hungry for better interest rates? We’ve got it!",
    "Banking can be tasty too — with rewards & offers.",
    "Have a snack while we process your request.",
    "Cooking up some great offers — stay tuned!",
    "Let’s feed your savings with smart plans!",
    "Lunch time? Don’t skip your SIP too!",
    "We serve hot savings and spicy interest rates!",
    "Bon Appétit! And happy banking!"
  ],
  love: [
    "We love our customers!",
    "Banking is better when there’s ❤️ involved.",
    "Love + Savings = Eluri Life Goals!",
    "Sending you good vibes and great returns.",
    "We care, we support, we grow together.",
    "You're not just a customer, you're family.",
    "Love saving money? You’re in the right place.",
    "Thanks for the love! We're here for you.",
    "Your trust = our biggest reward.",
    "Eluri ❤️ You!"
  ]
};

const keywordMap = {
  loan: ["loan", "loans", "emi"],
  fd: ["fd", "fixed deposit", "deposit", "deposits"],
  savings: ["savings", "saving", "save"],
  locker: ["locker", "lockers", "safe", "vault"],
  marriage: ["marriage", "wedding"],
  food: ["food", "lunch", "dinner"],
  love: ["love", "like", "care"]
};

const launcherToggle = document.getElementById("launcherToggle");
const launcherMenu = document.getElementById("launcherMenu");
const chatBody = document.getElementById("chatBody");

launcherToggle.addEventListener("click", () => {
  launcherMenu.style.display = launcherMenu.style.display === "flex" ? "none" : "flex";
});

function getResponseCategory(text) {
  const msg = text.toLowerCase();
  for (const [category, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => msg.includes(keyword))) {
      return category;
    }
  }
  return null;
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = '';

  const keyword = getResponseCategory(text);
  const reply = keyword
    ? responses[keyword][Math.floor(Math.random() * responses[keyword].length)]
    : "Thanks for your message! I’ll get someone from support to assist you.";

  setTimeout(() => {
    appendMessage("bot", `${reply}<br><br><button class="support-btn" onclick="document.getElementById('formModal').style.display='flex'">Fill the support form</button>`);
  }, 600);
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `chat-message ${sender}`;
  div.innerHTML = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function submitSupportForm() {
  const name = document.getElementById("supportName").value;
  const email = document.getElementById("supportEmail").value;
  const phone = document.getElementById("supportPhone").value;
  const subject = document.getElementById("supportSubject").value;
  const message = document.getElementById("supportMessage").value;

  if (!name || !email || !phone || !subject || !message) {
    alert("Please fill all fields.");
    return;
  }

  const text = `Hello, I need support.\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`;
  const whatsappLink = `https://wa.me/917282923737?text=${encodeURIComponent(text)}`;
  window.open(whatsappLink, "_blank");

  document.getElementById("formModal").style.display = "none";
  document.querySelectorAll('.support-form input, .support-form textarea').forEach(i => i.value = '');
}

window.addEventListener('click', function(e) {
  if (e.target.id === "formModal") {
    document.getElementById("formModal").style.display = "none";
  }
});
