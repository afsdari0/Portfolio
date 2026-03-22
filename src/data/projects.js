export const projects = [
  {
    id: 1,
    name: "Tibia Bot",
    tecno: "Python",
    about:
      "Automação de tarefas para Tibia com scripts em Python, foco em eficiência e controle. Inclui rotinas configuráveis e integração com o ambiente do jogo.",
    img: new URL("@/assets/tibiaBot.png", import.meta.url).href,
    category: "Python",
    /** URL da demo, deploy ou README no GitHub */
    link: "https://github.com/afsdari0",
    ctaLabel: "Ver no GitHub",
  },
  {
    id: 2,
    name: "Gerador De Senha",
    tecno: "JavaScript / CSS",
    about:
      "Aplicação web para gerar senhas fortes com opções de tamanho e caracteres. Interface simples, responsiva e pensada para uso rápido no dia a dia.",
    img: new URL("@/assets/geradorDeSenha.png", import.meta.url).href,
    category: "web",
    link: "https://github.com/afsdari0",
    ctaLabel: "Ver README no GitHub",
  },
]
