import { data } from './data';
import * as SiIcons from 'react-icons/si';
import * as Fa6Icons from 'react-icons/fa6';
import * as TbIcons from 'react-icons/tb';
import { useState, useEffect } from 'react';

interface IconRendererProps {
  iconName: string;
  className?: string;
}

const IconRenderer = ({ iconName, className }: IconRendererProps) => {
  let IconComponent;
  
  if (iconName.startsWith('Si')) {
    // @ts-ignore
    IconComponent = SiIcons[iconName];
  } else if (iconName.startsWith('Fa')) {
    // @ts-ignore
    IconComponent = Fa6Icons[iconName];
  } else if (iconName.startsWith('Tb')) {
    // @ts-ignore
    IconComponent = TbIcons[iconName];
  }

  if (!IconComponent) return <span className="material-symbols-outlined text-sm">question_mark</span>;
  return <IconComponent className={className} />;
};

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const categories = Array.from(new Set(data.stacks.map(s => s.category)));

  useEffect(() => {
    // Observer for Active Section (Menu) - More sensitive to top of viewport
    const activeOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const activeCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Observer for Reveal Animation
    const revealOptions = {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0
    };

    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]);
        }
      });
    };

    const activeObserver = new IntersectionObserver(activeCallback, activeOptions);
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    const sections = ['about', 'stacks', 'projects', 'education', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        activeObserver.observe(el);
        revealObserver.observe(el);
      }
    });

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Force visibility immediately on click
      setVisibleSections(prev => prev.includes(id) ? prev : [...prev, id]);
      
      // Update state immediately to reflect in UI
      setActiveSection(id);

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const navLinks = [
    { id: 'about', label: 'Sobre' },
    { id: 'stacks', label: 'Tecnologias' },
    { id: 'projects', label: 'Projetos' },
    { id: 'education', label: 'Formação' },
    { id: 'contact', label: 'Contato' }
  ];

  const getRevealClass = (id: string) => {
    return `transition-all duration-1000 ease-out transform will-change-[opacity,transform] ${
      visibleSections.includes(id) 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`;
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30 selection:text-primary-fixed overflow-x-hidden">
      <div className="grain"></div>
      
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#060e20]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(161,250,255,0.06)] border-b border-outline-variant/10">
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-[#dee5ff] font-headline uppercase">
            {data.name.split(' ').slice(0, 1)} // 2026
          </div>
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`font-headline uppercase tracking-widest text-sm transition-all duration-300 relative pb-1 ${
                  activeSection === link.id 
                    ? 'text-[#a1faff]' 
                    : 'text-[#dee5ff]/60 hover:text-[#a1faff]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#a1faff] transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0'
                }`} />
              </a>
            ))}
          </div>
          <a 
            href="/Curriculo-MatheusMarquesEiras.pdf" 
            download
            className="flex items-center gap-2 bg-primary text-on-primary font-headline font-bold px-6 py-2 rounded-md hover:bg-primary-container transition-all text-sm tracking-widest uppercase"
          >
            CURRÍCULO
            <span className="material-symbols-outlined text-sm">download</span>
          </a>
        </nav>
      </header>

      <main className="pt-32">
        {/* Hero Section / About */}
        <section className="px-8 mb-24 lg:mb-48 scroll-mt-32" id="about">
          <div className={getRevealClass('about')}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <span className="label-md uppercase tracking-[0.2rem] text-primary mb-6 block font-label">{data.about.greeting}</span>
                <h1 className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter mb-12">
                  {data.about.headline.split(' ').slice(0, -1).join(' ')} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    {data.about.headline.split(' ').slice(-1)}
                  </span>
                </h1>
                <div className="max-w-xl space-y-6 text-on-surface-variant leading-relaxed text-lg">
                  {data.about.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 relative group">
                <div className="absolute -inset-4 bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all"></div>
                <div className="relative aspect-[4/5] bg-surface-container overflow-hidden rounded-lg">
                  <img 
                    alt="Retrato" 
                    className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity hover:grayscale-0 transition-all duration-500" 
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                  />
                </div>
                <div className="absolute bottom-6 -left-8 bg-surface-bright/40 backdrop-blur-xl p-6 border border-outline-variant/20 max-w-[240px]">
                  <p className="font-label text-[10px] tracking-widest uppercase text-primary mb-2">Status Atual</p>
                  <p className="font-headline font-bold text-on-surface italic">"{data.about.status}"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="bg-surface-container-low py-24 mb-24 lg:mb-48 scroll-mt-32" id="stacks">
          <div className={getRevealClass('stacks')}>
            <div className="px-8 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter uppercase">TECNOLOGIAS</h2>
                <p className="font-label text-sm uppercase tracking-widest text-outline">Matriz de Conhecimento Full Stack</p>
              </div>
              
              <div className="space-y-16">
                {categories.map(cat => (
                  <div key={cat}>
                    <h3 className="label-md text-primary mb-6 flex items-center gap-4">
                      <span className="h-px bg-primary/30 flex-grow"></span>
                      {cat}
                      <span className="h-px bg-primary/30 w-12"></span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-outline-variant/10 border border-outline-variant/10 overflow-hidden">
                      {data.stacks.filter(s => s.category === cat).map((stack, i) => (
                        <div key={i} className="bg-surface p-6 hover:bg-surface-container transition-colors group">
                          <IconRenderer iconName={stack.icon} className="text-primary text-2xl mb-4 group-hover:scale-110 transition-transform" />
                          <h4 className="font-headline font-bold text-sm mb-1">{stack.name}</h4>
                          <p className="text-[9px] text-on-surface-variant font-label uppercase tracking-widest">Tecnologia Real</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-8 mb-24 lg:mb-48 scroll-mt-32" id="projects">
          <div className={getRevealClass('projects')}>
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-baseline mb-16">
                <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter uppercase">PROJETOS</h2>
                <div className="h-px bg-outline-variant/30 flex-grow mx-8 hidden md:block"></div>
                <span className="font-label text-sm uppercase tracking-[0.2rem] text-primary">Engenharia em Destaque</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {data.projects.map((project, i) => (
                  <div key={i} className={`group ${i % 2 !== 0 ? 'md:mt-12' : ''}`}>
                    <div className="aspect-square bg-surface-container overflow-hidden rounded-lg mb-8 relative">
                      <img alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" src={project.image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                        {project.icons.map((icon, j) => (
                          <div key={j} className="w-8 h-8 flex items-center justify-center bg-surface-variant/80 backdrop-blur-md rounded-lg text-primary border border-primary/10" title={project.tags[j]}>
                            <IconRenderer iconName={icon} className="text-xs" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed mb-6 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] font-label uppercase tracking-widest text-outline border border-outline/20 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a className="inline-flex items-center gap-2 text-sm font-label font-bold uppercase tracking-widest text-primary hover:gap-4 transition-all" href="#">
                      Explorar Protocolo <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="bg-surface-container-low py-24 mb-24 lg:mb-48 scroll-mt-32" id="education">
          <div className={getRevealClass('education')}>
            <div className="px-8 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter uppercase">FORMAÇÃO</h2>
                <p className="font-label text-sm uppercase tracking-widest text-outline">Trajetória Acadêmica e Idiomas</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Academic Card */}
                <div className="lg:col-span-7 bg-surface p-12 rounded-xl border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <IconRenderer iconName="TbDeviceDesktop" className="text-9xl" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-headline font-bold mb-2">Graduação em Ciência da Computação</h3>
                    <p className="text-xl text-primary font-medium italic mb-8">
                      {data.about.education?.includes(' - ') ? data.about.education.split(' - ')[1] : data.about.education}
                    </p>
                    
                    <div className="h-px bg-outline-variant/20 mb-8"></div>
                    
                    <div>
                      <h4 className="label-md text-outline mb-6 uppercase tracking-widest text-[10px]">Idiomas</h4>
                      <div className="space-y-4 max-w-md">
                        {data.languages.map((lang, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-base font-bold text-on-surface">{lang.name}</span>
                            <span className="text-sm text-on-surface-variant font-medium">{lang.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action Card */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-8 italic leading-none uppercase text-[#dee5ff]">PRONTO PARA <br/>CONSTRUIR?</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-md">
                    Estou disponível para oportunidades de estágio e projetos Full Stack. Vamos transformar lógicas complexas em sistemas de alta performance.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={data.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-[#1d2127] text-white rounded-lg font-headline font-bold text-xs uppercase tracking-widest hover:bg-[#2d333b] transition-all border border-white/5"
                    >
                      <IconRenderer iconName="SiGithub" className="text-xl" />
                      GITHUB
                    </a>
                    <a 
                      href={data.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-[#0077b5] text-white rounded-lg font-headline font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                    >
                      <IconRenderer iconName="FaLinkedin" className="text-xl" />
                      LINKEDIN
                    </a>
                    <a 
                      href={data.contact.huggingface}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 border border-outline-variant/30 text-on-surface rounded-lg font-headline font-bold text-xs uppercase tracking-widest hover:bg-surface-bright transition-all"
                    >
                      <IconRenderer iconName="SiHuggingface" className="text-xl" />
                      HUGGINGFACE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-8 pb-32 scroll-mt-32" id="contact">
          <div className={getRevealClass('contact')}>
            <div className="max-w-7xl mx-auto bg-surface-container border border-outline-variant/10 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(161,250,255,0.03)]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-outline-variant/10">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-8 italic">ENTRE EM <br/>CONTATO</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-surface-bright flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-label uppercase tracking-widest text-outline">E-mail</p>
                        <p className="font-headline font-bold">{data.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-surface-bright flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-label uppercase tracking-widest text-outline">Telefone</p>
                        <p className="font-headline font-bold">{data.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-surface-bright flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined">share_location</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-label uppercase tracking-widest text-outline">Localidade</p>
                        <p className="font-headline font-bold">{data.contact.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-12 lg:p-20 bg-surface-container-high/50">
                  <form className="space-y-8">
                    <div className="relative group">
                      <input className="w-full bg-transparent border-0 border-b border-outline py-3 focus:ring-0 focus:border-primary peer transition-all placeholder-transparent" id="name" placeholder="Nome" type="text"/>
                      <label className="absolute left-0 top-3 text-on-surface-variant font-label text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-primary peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]" htmlFor="name">Seu Nome</label>
                    </div>
                    <div className="relative group">
                      <input className="w-full bg-transparent border-0 border-b border-outline py-3 focus:ring-0 focus:border-primary peer transition-all placeholder-transparent" id="email" placeholder="Email" type="email"/>
                      <label className="absolute left-0 top-3 text-on-surface-variant font-label text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-primary peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]" htmlFor="email">Email</label>
                    </div>
                    <div className="relative group">
                      <textarea className="w-full bg-transparent border-0 border-b border-outline py-3 focus:ring-0 focus:border-primary peer transition-all placeholder-transparent resize-none" id="message" placeholder="Mensagem" rows={4}></textarea>
                      <label className="absolute left-0 top-3 text-on-surface-variant font-label text-sm uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-primary peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]" htmlFor="message">Resumo / Intenção do Projeto</label>
                    </div>
                    <button className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-md hover:bg-primary-container transition-all tracking-[0.2rem] uppercase text-sm" type="submit">
                      ENVIAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#091328] w-full py-12 border-t border-[#40485d]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-7xl mx-auto">
          <div className="font-body text-[10px] tracking-[0.1rem] uppercase text-[#6d758c]">
            © 2026 PROJETADO POR {data.name}
          </div>
          <div className="flex gap-8">
            <a className="font-body text-[10px] tracking-[0.1rem] uppercase text-[#6d758c] hover:text-[#a1faff] transition-colors" href={data.contact.github}>GITHUB</a>
            <a className="font-body text-[10px] tracking-[0.1rem] uppercase text-[#6d758c] hover:text-[#a1faff] transition-colors" href={data.contact.linkedin}>LINKEDIN</a>
            <a className="font-body text-[10px] tracking-[0.1rem] uppercase text-[#6d758c] hover:text-[#a1faff] transition-colors" href={data.contact.huggingface}>HUGGINGFACE</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
