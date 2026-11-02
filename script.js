/* PROJECT 038 — THE SALAZAR CURTAIN
   The experience is intentionally client-side. Local storage is a convenience,
   not a security boundary: users can clear it, use another browser, or inspect code. */
(() => {
  "use strict";

  const STORAGE_KEY = "project038_salazar_curtain_v1";
  const screens = [...document.querySelectorAll(".screen")];
  const docs = {
    doc1: {
      number: "DOCUMENT 038-01",
      title: "Relatório do espetáculo",
      content: "O espetáculo de Salazar terminou. A cortina fechou. Mas a conversa sobre a outra cortina apenas começou.",
      comment: "Isso você já sabia. Continue."
    },
    doc2: {
      number: "DOCUMENT 038-02",
      title: "Inventário do castelo",
      content: "Inventário atualizado: 1 ego ferido, 2 comentários desnecessários e uma quantidade preocupante de drama.",
      comment: "Informação absolutamente essencial. Confia."
    },
    doc3: {
      number: "DOCUMENT 038-03",
      title: "Nota não catalogada",
      content: "A cortina não é o fim do espetáculo. É apenas aquilo que impede a plateia de ver o que está do outro lado.",
      comment: "Talvez essa seja a pista que você procura."
    }
  };

  const state = {
    openedDocs: new Set(),
    quizAnswered: false,
    codeUnlocked: false,
    submitted: false
  };

  const $ = (id) => document.getElementById(id);
  const modal = $("document-modal");

  function showScreen(name) {
    screens.forEach(screen => screen.classList.toggle("active", screen.id === `screen-${name}`));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showScreen(button.dataset.go));
  });
  document.querySelectorAll("[data-home]").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showScreen("intro");
    });
  });

  // First challenge: the wrong answer is feedback, not a dead end.
  document.querySelectorAll(".answer").forEach(button => {
    button.addEventListener("click", () => {
      if (state.quizAnswered) return;
      const correct = button.dataset.answer === "B";
      document.querySelectorAll(".answer").forEach(item => {
        item.disabled = true;
        if (item.dataset.answer === "B") item.classList.add("correct");
      });
      button.classList.add(correct ? "correct" : "wrong");
      state.quizAnswered = true;
      $("quiz-continue").disabled = false;
      const feedback = $("quiz-feedback");
      feedback.className = `feedback ${correct ? "success" : "error"}`;
      feedback.textContent = correct
        ? "Certo. Você estava prestando atenção. Não deixe isso subir à cabeça."
        : "Não foi dessa vez. A resposta era B: a boca dele se fecha como uma cortina. Vamos fingir que isso não aconteceu.";
      $("quiz-aside").textContent = correct
        ? "INVESTIGADOR: Muito bem. Um começo promissor. Não se acostume com elogios."
        : "INVESTIGADOR: Eu teria aceitado um palpite melhor. Ainda temos trabalho pela frente.";
    });
  });

  // Confidential documents: each document opens in an accessible modal.
  function openDocument(key) {
    const doc = docs[key];
    if (!doc) return;
    $("modal-number").textContent = doc.number;
    $("modal-title").textContent = doc.title;
    $("modal-content").textContent = doc.content;
    $("modal-comment").textContent = doc.comment;
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
    $("modal-close").focus();
    state.openedDocs.add(key);
    document.querySelector(`[data-doc="${key}"]`).classList.add("opened");
    document.querySelector(`[data-doc="${key}"] .file-open`).textContent = "DOCUMENTO ANALISADO ✓";
    const count = state.openedDocs.size;
    $("files-count").textContent = count;
    $("files-fill").style.width = `${(count / 3) * 100}%`;
    if (count === 3) {
      $("files-continue").disabled = false;
      $("files-feedback").className = "feedback success";
      $("files-feedback").textContent = "Os três documentos foram analisados. Uma das notas parece menos inútil do que as outras.";
      $("files-aside").textContent = "INVESTIGADOR: Viu? Até o inventário teve sua utilidade. Quase nenhuma, mas teve.";
    }
  }

  document.querySelectorAll("[data-doc]").forEach(button => {
    button.addEventListener("click", () => openDocument(button.dataset.doc));
  });
  function closeModal() {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
  }
  $("modal-close").addEventListener("click", closeModal);
  $("modal-done").addEventListener("click", closeModal);
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("visible")) closeModal(); });

  // The number is a shared personal reference; no answer is disclosed in the page.
  function validateCode() {
    if (state.codeUnlocked) return;
    const value = $("case-code").value.trim();
    const feedback = $("code-feedback");
    if (value === "038") {
      state.codeUnlocked = true;
      feedback.className = "feedback success";
      feedback.textContent = "Código aceito. Acesso concedido ao formulário final.";
      $("code-submit").disabled = true;
      $("case-code").disabled = true;
      $("code-aside").textContent = "INVESTIGADOR: Olha só. A memória funcionou. Estou quase impressionado.";
      const next = document.createElement("button");
      next.className = "btn btn-primary";
      next.textContent = "ACESSAR TEORIA FINAL →";
      next.style.marginTop = "14px";
      next.addEventListener("click", () => showScreen("theory"));
      $("code-feedback").after(next);
    } else {
      feedback.className = "feedback error";
      feedback.textContent = value.length
        ? "Código não reconhecido. Pense naquela escolha que parecia aleatória..."
        : "Campo vazio. Até os arquivos confidenciais precisam de alguma informação.";
      $("code-aside").textContent = "INVESTIGADOR: Não tente adivinhar qualquer número. Use a cabeça. É para isso que ela serve.";
      $("case-code").select();
    }
  }
  $("code-submit").addEventListener("click", validateCode);
  $("case-code").addEventListener("keydown", event => { if (event.key === "Enter") validateCode(); });

  // Restore the one-submit lock on this browser. This is deliberately not presented
  // as tamper-proof: localStorage can be removed or bypassed.
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch (_) {}
  if (saved && saved.submitted) {
    state.submitted = true;
    showScreen("result");
    $("result-title").textContent = "Teoria já registrada.";
    $("result-title").insertAdjacentHTML("afterend", '<p class="body-copy">Este navegador já possui um registro final para o caso 038.</p>');
  }

  $("theory-input").addEventListener("input", () => {
    $("char-count").textContent = `${$("theory-input").value.length} / 800`;
  });

  $("theory-submit").addEventListener("click", () => {
    if (state.submitted) return;
    const theory = $("theory-input").value.trim();
    const feedback = $("theory-feedback");
    if (!theory) {
      feedback.className = "feedback error";
      feedback.textContent = "Uma teoria em branco não é exatamente uma teoria, agente.";
      $("theory-input").focus();
      return;
    }
    const record = {
      submitted: true,
      theory,
      submittedAt: new Date().toISOString(),
      project: "PROJECT 038 — THE SALAZAR CURTAIN"
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch (_) {
      feedback.className = "feedback error";
      feedback.textContent = "Não foi possível salvar neste navegador. Verifique o armazenamento local e tente novamente.";
      return;
    }
    state.submitted = true;
    $("theory-input").disabled = true;
    $("theory-submit").disabled = true;
    showScreen("result");
  });

  // Small local date stamp; no network request is made.
  const now = new Date();
  $("date-stamp").textContent = `ARCHIVE DATE / ${now.toLocaleDateString("pt-BR")}`;
   $("quiz-continue").addEventListener("click", () => showScreen("files"));
  })();
