export const projects = [
  {
    id: 1,
    name: 'Tibia Bot',
    tecno: 'Python',
    about: {
      'pt-BR': 'Automação de tarefas para Tibia com scripts em Python, foco em eficiência e controle. Inclui rotinas configuráveis e integração com o ambiente do jogo.',
      'en': 'Task automation for Tibia using Python scripts, focused on efficiency and control. Includes configurable routines and game environment integration.',
    },
    img: new URL('@/assets/tibiaBot.webp', import.meta.url).href,
    category: 'Python',
    rank: 'A',
    techStack: ['Python', 'Automação'],
    featured: true,
    link: 'https://github.com/afsdari0',
    ctaLabel: {
      'pt-BR': 'Ver no GitHub',
      'en': 'View on GitHub',
    },
  },
  {
    id: 2,
    name: 'Gerador De Senha',
    tecno: 'JavaScript / CSS',
    about: {
      'pt-BR': 'Aplicação web para gerar senhas fortes com opções de tamanho e caracteres. Interface simples, responsiva e pensada para uso rápido no dia a dia.',
      'en': 'Web app for generating strong passwords with size and character options. Simple, responsive interface designed for quick everyday use.',
    },
    img: new URL('@/assets/geradorDeSenha.png', import.meta.url).href,
    category: 'web',
    rank: 'C',
    techStack: ['JavaScript', 'CSS'],
    featured: true,
    link: 'https://github.com/afsdari0',
    ctaLabel: {
      'pt-BR': 'Ver README no GitHub',
      'en': 'View README on GitHub',
    },
  },
]
