const PROMPT_CATEGORIES = {
  hooks: {
    title: "Hooks — Earn the next line without cheap clickbait",
    subtitle: "Included in the 100+ marketing prompts pack ($17).",
    items: [
      {
        tag: "Contrarian Hook • 100+ Pack",
        text: "Act as a candid marketing editor. My offer is [OFFER] for [AUDIENCE]. Write 6 opening lines that challenge a routine habit in [NICHE] without sounding aggressive or theatrical. Keep every line under 14 words."
      },
      {
        tag: "Real Moment Hook • 100+ Pack",
        text: "Describe 5 everyday moments when [AUDIENCE] gets frustrated trying to achieve [OUTCOME] with [CURRENT METHOD]. Turn each moment into a natural, conversational first line for short-form video or social posts."
      }
    ]
  },
  emails: {
    title: "Emails — Notes that sound like one person writing to another",
    subtitle: "Included in the 100+ marketing prompts pack ($17).",
    items: [
      {
        tag: "Plain-Spoken Pitch • 100+ Pack",
        text: "Write a short marketing email for [OFFER] ($17 or [PRICE]) aimed at [AUDIENCE]. Open with one common mistake people make with [TOPIC], explain how [OFFER] removes the bottleneck, and close with a calm, clear CTA. Avoid buzzwords."
      },
      {
        tag: "Doubt-Handling Follow-Up • 100+ Pack",
        text: "Draft a helpful follow-up email answering this exact hesitation from [AUDIENCE] about [OFFER]: '[OBJECTION]'. Keep it grounded, direct, and easy to read on a phone."
      }
    ]
  },
  ads: {
    title: "Ad Creatives — Clear angles built for fast testing",
    subtitle: "Included in the 100+ marketing prompts pack ($17).",
    items: [
      {
        tag: "Feed Creative Brief • 100+ Pack",
        text: "Give me 4 ad concepts for [OFFER] targeting [AUDIENCE]. For each one, write: (1) a concrete visual concept, (2) a headline under 8 words, and (3) short body copy under 75 words focused on one clear outcome."
      },
      {
        tag: "Side-by-Side Contrast • 100+ Pack",
        text: "Write 3 ad variations contrasting 'doing [TASK] manually from scratch' against 'using [OFFER]'. Keep the wording natural, specific, and free of corporate filler."
      }
    ]
  },
  funnels: {
    title: "Funnels — Smooth transitions from curiosity to checkout",
    subtitle: "Included in the 100+ marketing prompts pack ($17).",
    items: [
      {
        tag: "Landing Page Core • 100+ Pack",
        text: "For [OFFER] priced at $17 for [AUDIENCE], write a clear headline, a 2-sentence subheadline, 3 practical takeaways, and 3 short FAQ answers that reduce hesitation before clicking checkout."
      },
      {
        tag: "Ad-to-Page Continuity • 100+ Pack",
        text: "Someone clicks a post or ad about [TOPIC] and lands on a page for [OFFER]. Write the opening section so the message feels consistent, honest, and easy to act on."
      }
    ]
  },
  angles: {
    title: "Angles — Fresh ways to frame what you already built",
    subtitle: "Included in the 100+ marketing prompts pack ($17).",
    items: [
      {
        tag: "5-Angle Breakdown • 100+ Pack",
        text: "Generate 5 distinct marketing angles for [OFFER] aimed at [AUDIENCE]: (1) time saved, (2) cost of staying stuck, (3) less friction/overwhelm, (4) faster starting point, and (5) honest truth most people ignore."
      },
      {
        tag: "Audience Split • 100+ Pack",
        text: "Show how [OFFER] helps two different groups within [AUDIENCE]—[GROUP A] and [GROUP B]—in different ways. Write 2 natural positioning lines for each group."
      }
    ]
  }
};

const LEGAL_CONTENT = {
  terms: {
    title: "Terms of Use — SystemAI",
    html: `
      <p>SystemAI provides a digital bundle of 100+ marketing prompts for practical marketing and content drafting workflows.</p>
      <p>Purchases are processed through Gumroad at $17. You may use the prompts across your own campaigns and client work, but reselling, sublicensing, or redistributing the prompt pack as a competing product is not permitted.</p>
      <p>Support contact: mli.companyofficial@gmail.com | +16182038781</p>
    `
  },
  privacy: {
    title: "Privacy Policy — SystemAI",
    html: `
      <p>SystemAI does not sell your personal details to third-party data brokers.</p>
      <p>Information submitted on Gumroad when purchasing the 100+ marketing prompts ($17) or sent directly to our contact channels is used only to deliver access and respond to support requests.</p>
      <p>Contact: mli.companyofficial@gmail.com | +16182038781</p>
    `
  }
};

const promptGrid = document.getElementById("prompt-grid");
const categoryHeading = document.getElementById("category-heading");
const categorySubtitle = document.getElementById("category-subtitle");
const tabButtons = document.querySelectorAll(".tab-btn");

function renderCategory(categoryKey) {
  const categoryData = PROMPT_CATEGORIES[categoryKey];
  if (!categoryData || !promptGrid) return;

  categoryHeading.textContent = categoryData.title;
  categorySubtitle.textContent = categoryData.subtitle;
  promptGrid.innerHTML = "";

  categoryData.items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "prompt-card";

    const contentWrap = document.createElement("div");

    const tag = document.createElement("span");
    tag.className = "prompt-tag";
    tag.textContent = item.tag;

    const text = document.createElement("p");
    text.className = "prompt-text";
    text.textContent = item.text;

    contentWrap.appendChild(tag);
    contentWrap.appendChild(text);

    const actions = document.createElement("div");
    actions.className = "prompt-actions";

    const hint = document.createElement("span");
    hint.className = "prompt-hint";
    hint.textContent = "Paste & fill brackets";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy Prompt";

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(item.text);
      } catch {
        const fallback = document.createElement("textarea");
        fallback.value = item.text;
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand("copy");
        document.body.removeChild(fallback);
      }

      copyBtn.textContent = "Copied";
      copyBtn.classList.add("copied");

      setTimeout(() => {
        copyBtn.textContent = "Copy Prompt";
        copyBtn.classList.remove("copied");
      }, 1600);
    });

    actions.appendChild(hint);
    actions.appendChild(copyBtn);

    card.appendChild(contentWrap);
    card.appendChild(actions);
    promptGrid.appendChild(card);

    requestAnimationFrame(() => {
      setTimeout(() => {
        card.classList.add("is-visible");
      }, index * 70);
    });
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
    renderCategory(btn.dataset.category);
  });
});

const legalModal = document.getElementById("legal-modal");
const legalTitle = document.getElementById("legal-title");
const legalBody = document.getElementById("legal-body");
const closeLegalBtn = document.getElementById("close-legal");

document.querySelectorAll("[data-open-legal]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const doc = LEGAL_CONTENT[trigger.dataset.openLegal];
    if (!doc || !legalModal) return;
    legalTitle.textContent = doc.title;
    legalBody.innerHTML = doc.html;
    legalModal.classList.add("is-open");
  });
});

if (closeLegalBtn && legalModal) {
  closeLegalBtn.addEventListener("click", () => {
    legalModal.classList.remove("is-open");
  });

  legalModal.addEventListener("click", (event) => {
    if (event.target === legalModal) {
      legalModal.classList.remove("is-open");
    }
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

renderCategory("hooks");
