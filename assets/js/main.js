// Menu do celular, borda do topo ao rolar, imagens ampliadas e animação leve ao aparecer.
(() => {
  const botao = document.querySelector(".menu-botao");
  const menu = document.getElementById("menu");
  botao?.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
  menu?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("aberto");
      botao?.setAttribute("aria-expanded", "false");
    }),
  );

  const topo = document.getElementById("topo");
  const marcar = () => topo?.classList.toggle("rolou", window.scrollY > 8);
  window.addEventListener("scroll", marcar, { passive: true });
  marcar();

  // Casos: clicar amplia a imagem; clicar de novo ou Esc fecha.
  document.querySelectorAll(".galeria img").forEach((img) =>
    img.addEventListener("click", () => {
      const fundo = document.createElement("div");
      fundo.className = "ampliada";
      fundo.setAttribute("role", "dialog");
      fundo.setAttribute("aria-label", img.alt);
      const grande = img.cloneNode();
      grande.removeAttribute("loading");
      fundo.append(grande);
      const fechar = () => {
        fundo.remove();
        document.removeEventListener("keydown", esc);
      };
      const esc = (e) => e.key === "Escape" && fechar();
      fundo.addEventListener("click", fechar);
      document.addEventListener("keydown", esc);
      document.body.append(fundo);
    }),
  );

  const ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = String(new Date().getFullYear());

  if ("IntersectionObserver" in window) {
    const alvos = document.querySelectorAll(".secao__cabecalho, .cartao, .galeria figure, .linha-tempo li, .clinica, .sobre__grade > *");
    const obs = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            obs.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    alvos.forEach((el) => {
      el.classList.add("revelar");
      obs.observe(el);
    });
  }
})();
