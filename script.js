// Portfólio Deyse Medeiros

// 1. Resposta da API "digitando" uma única vez ao abrir a página
(function digitarJson() {
  const codigo = document.getElementById("json");
  if (!codigo) return;

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzirMovimento) return; // mostra o JSON completo direto

  // Guarda o texto de cada pedacinho e esvazia, mantendo as cores (spans)
  const nos = [];
  const walker = document.createTreeWalker(codigo, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) nos.push(walker.currentNode);
  const textos = nos.map((n) => n.textContent);
  nos.forEach((n) => (n.textContent = ""));

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  codigo.appendChild(cursor);

  let i = 0; // nó atual
  let j = 0; // letra atual
  const velocidade = 12; // ms por letra

  function passo() {
    if (i >= nos.length) {
      setTimeout(() => cursor.remove(), 1800);
      return;
    }
    // escreve algumas letras por vez para não demorar demais
    for (let k = 0; k < 2 && i < nos.length; k++) {
      nos[i].textContent += textos[i][j] ?? "";
      j++;
      if (j >= textos[i].length) { i++; j = 0; }
    }
    setTimeout(passo, velocidade);
  }
  setTimeout(passo, 500);
})();

// 2. Botão de copiar e-mail
document.querySelectorAll(".copiar").forEach((botao) => {
  botao.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(botao.dataset.email);
      botao.textContent = "Copiado";
    } catch {
      botao.textContent = "Selecione e copie";
    }
    setTimeout(() => (botao.textContent = "Copiar"), 2000);
  });
});

// 3. Ano atual no rodapé
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

// 4. Filtro de projetos
const filtros = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".card");
filtros.forEach((botao) => {
  botao.addEventListener("click", () => {
    const alvo = botao.dataset.filtro;
    filtros.forEach((b) => {
      const ativo = b === botao;
      b.classList.toggle("ativo", ativo);
      b.setAttribute("aria-pressed", String(ativo));
    });
    cards.forEach((card) => {
      const cats = card.dataset.cat.split(" ");
      card.hidden = !(alvo === "todos" || cats.includes(alvo));
    });
  });
});

// 5. Abas da seção Carreira (com navegação por setas)
const abas = Array.from(document.querySelectorAll('.abas [role="tab"]'));
function ativarAba(aba) {
  abas.forEach((a) => {
    const sel = a === aba;
    a.setAttribute("aria-selected", String(sel));
    a.tabIndex = sel ? 0 : -1;
    document.getElementById(a.getAttribute("aria-controls")).hidden = !sel;
  });
  aba.focus();
}
abas.forEach((aba, i) => {
  aba.addEventListener("click", () => ativarAba(aba));
  aba.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") ativarAba(abas[(i + 1) % abas.length]);
    if (e.key === "ArrowLeft") ativarAba(abas[(i - 1 + abas.length) % abas.length]);
  });
});
