import { useEffect, useState } from "react";
import pt from "@/i18n/pt.json";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";
import { BannerArtwork, type BannerIcon } from "@/components/BannerArtwork";
import churchIllustration from "@/assets/brand/church-illustration.jpg";
import legalAssistanceImg from "@/assets/legal-assistance.jpg";
import masshealthImg from "@/assets/masshealth.jpg";
import housingImg from "@/assets/housing.jpg";
import energyImg from "@/assets/energy.jpg";
import vawaImg from "@/assets/vawa.jpg";
import wicImg from "@/assets/wic.jpg";
import headstartImg from "@/assets/headstart.jpg";
import notaryImg from "@/assets/notary.jpg";
import pantryImg from "@/assets/pantry.jpg";
import goodsImg from "@/assets/goods.jpg";
import greencardImg from "@/assets/greencard.jpg";
import citizenshipImg from "@/assets/citizenship.jpg";
import certificateImg from "@/assets/certificate.jpg";

const SOCIAL_SUPPORT_URL =
  "https://airtable.com/apppmcsUFcMAqWkap/shrHQfBvGK3zP25m3";
const HOUSEHOLD_ITEMS_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdIkVKaeyb1TZngHisAKYE0XHIKbUjiX1ZanT9jMxHrGq-DQw/viewform";


type Program = {
  img?: string;
  icon?: BannerIcon;
  requestUrl?: string;
  requestLabel?: string;
  requestType?: "household-items";
  tag: string;
  title: string;
  forWho: string;
  pt: string;
  en: string;
  es: string;
};

const programs: Program[] = [
  {
    img: masshealthImg,
    tag: "SAÚDE / HEALTH",
    title: "MassHealth",
    forWho: "Para quem não tem plano de saúde ou precisa renovar o seu.",
    pt: "Ajudamos você a se inscrever ou renovar o plano de saúde do estado, preenchendo os formulários com você.",
    en: "We help you apply for or renew state health coverage and complete the forms with you.",
    es: "Te ayudamos a solicitar o renovar el plan de salud del estado y a completar los formularios.",
  },
  {
    img: housingImg,
    tag: "MORADIA / HOUSING",
    title: "HCEC — Moradia e aluguel",
    forWho: "Para quem está atrasado no aluguel, recebeu aviso de despejo ou tem problemas com o proprietário do imóvel.",
    pt: "Orientamos sobre seus direitos, possíveis ajudas para pagar o aluguel e como evitar o despejo.",
    en: "Guidance on your rights, rent assistance options, and how to avoid eviction.",
    es: "Orientación sobre tus derechos, ayudas para el alquiler y cómo evitar el desalojo.",
  },
  {
    img: energyImg,
    tag: "ENERGIA / ENERGY",
    title: "HEAP — Contas de energia",
    forWho: "Para quem tem dificuldade de pagar luz, gás ou óleo de aquecimento no inverno.",
    pt: "Ajudamos a pedir o benefício que paga parte da sua conta de energia durante o inverno.",
    en: "We help you apply for the benefit that pays part of your winter energy bill.",
    es: "Te ayudamos a solicitar el beneficio que paga parte de tu factura de energía en invierno.",
  },
  {
    img: vawaImg,
    tag: "PROTEÇÃO / PROTECTION",
    title: "VAWA — Violência doméstica",
    forWho: "Para quem sofre ou sofreu violência ou abuso dentro de casa.",
    pt: "Oferecemos apoio confidencial e orientação sobre proteção e sobre o pedido de status pelo VAWA.",
    en: "Confidential support and guidance on protection and applying for status under VAWA.",
    es: "Apoyo confidencial y orientación sobre protección y solicitudes de estatus migratorio bajo VAWA.",
  },
  {
    img: wicImg,
    tag: "FAMÍLIA / FAMILY",
    title: "WIC — Gestantes e crianças",
    forWho: "Para gestantes, mães que acabaram de ter um bebê e crianças de até 5 anos.",
    pt: "Ajuda mensal para comprar alimentos saudáveis, leite e fórmula, além de orientação de nutrição.",
    en: "Monthly help buying healthy food, milk and formula, plus nutrition guidance.",
    es: "Ayuda mensual para comprar alimentos saludables, leche y fórmula, más orientación nutricional.",
  },
  {
    img: headstartImg,
    tag: "CRIANÇAS / CHILDREN",
    title: "Head Start — Creche e saúde",
    forWho: "Para famílias com crianças do nascimento aos 5 anos.",
    pt: "Orientação sobre programas de educação infantil e apoio à saúde e ao desenvolvimento das crianças.",
    en: "Guidance on early childhood education programs and support for children’s health and development.",
    es: "Orientación sobre programas de educación infantil y apoyo a la salud y al desarrollo de los niños.",
  },
  {
    img: notaryImg,
    tag: "DOCUMENTOS / DOCUMENTS",
    title: "Notário público / Tabelião",
    forWho: "Para quem precisa reconhecer firma ou assinar um documento oficial.",
    pt: "Um notário público autorizado assina e valida seus documentos aqui mesmo na igreja.",
    en: "An authorized notary public signs and validates your documents here at the church.",
    es: "Un notario público autorizado firma y valida tus documentos aquí en la iglesia.",
  },
  {
    img: pantryImg,
    tag: "ALIMENTAÇÃO / FOOD",
    title: "Food Pantry — Alimentos",
    forWho: "Para qualquer família que precisa de comida neste momento.",
    pt: "Distribuímos sacolas com alimentos básicos gratuitamente, sem burocracia.",
    en: "We hand out free bags of basic groceries, with no red tape.",
    es: "Entregamos bolsas de alimentos básicos gratis, sin trámites complicados.",
  },
  {
    img: goodsImg,
    requestType: "household-items",
    tag: "CASA / HOME",
    title: "Household Goods — Móveis",
    forWho: "Para quem está mudando de casa ou não tem móveis e itens básicos.",
    pt: "Ajudamos a conseguir cama, mesa, cadeiras e outros itens essenciais para a sua casa.",
    en: "We help you get a bed, table, chairs and other essentials for your home.",
    es: "Te ayudamos a conseguir cama, mesa, sillas y otros artículos esenciales.",
  },
  {
    img: greencardImg,
    tag: "IMIGRAÇÃO / IMMIGRATION",
    title: "Green Card — Renovação (I-90)",
    forWho: "Para quem tem um Green Card vencido, próximo do vencimento, perdido ou roubado.",
    pt: "Ajudamos a preencher e enviar o formulário I-90 para renovar ou substituir o seu Green Card.",
    en: "We help you complete and file Form I-90 to renew or replace your green card.",
    es: "Te ayudamos a llenar y enviar el formulario I-90 para renovar o reemplazar tu green card.",
  },
  {
    img: citizenshipImg,
    tag: "IMIGRAÇÃO / IMMIGRATION",
    title: "Cidadania (N-400)",
    forWho: "Para quem já tem um Green Card há alguns anos e quer se tornar cidadão americano.",
    pt: "Ajudamos com o formulário N-400 e explicamos cada passo até a entrevista.",
    en: "We help with Form N-400 and explain every step up to the interview.",
    es: "Ayudamos con el formulario N-400 y explicamos cada paso hasta la entrevista.",
  },
  {
    img: certificateImg,
    tag: "IMIGRAÇÃO / IMMIGRATION",
    title: "Certificado de Cidadania (N-600)",
    forWho: "Para filhos que adquiriram cidadania por meio dos pais e precisam do comprovante.",
    pt: "Ajudamos a pedir o certificado que comprova a cidadania americana do seu filho.",
    en: "We help request the certificate proving your child's U.S. citizenship.",
    es: "Ayudamos a solicitar el certificado que comprueba la ciudadanía de tu hijo.",
  },
  {
    icon: "legal",
    img: legalAssistanceImg,
    tag: "ASSISTÊNCIA JURÍDICA / LEGAL ASSISTANCE",
    title: "Assistência jurídica",
    forWho: "Para jovens, famílias e pessoas idosas que precisam de assistência jurídica.",
    pt: "Apoio legal e jurídico. Casos não criminais.",
    en: "Legal guidance and support. Non-criminal cases.",
    es: "Apoyo legal y jurídico. Casos no penales.",
    requestUrl: SOCIAL_SUPPORT_URL,
    requestLabel: "Solicitar assistência jurídica",
  },
];


const groups: { id: string; title: string; description: string; indices: number[]; icon: BannerIcon }[] = [
  { id: "saude", icon: "family", title: "Saúde e família", description: "Cuidados para você e sua família.", indices: [0, 4, 5] },
  { id: "moradia", icon: "housing", title: "Moradia e energia", description: "Orientação para cuidar da sua casa.", indices: [1, 2] },
  { id: "alimentos", icon: "donations", title: "Alimentos e móveis", description: "Apoio com necessidades do dia a dia.", indices: [7, 8] },
  { id: "documentos", icon: "citizenship", title: "Documentos e imigração", description: "Ajuda com documentos e formulários.", indices: [6, 9, 10, 11] },
  { id: "protecao", icon: "protection", title: "Proteção", description: "Acolhimento e orientação confidencial.", indices: [3] },
  { id: "assistencia-juridica", icon: "legal", title: "Assistência jurídica", description: "Orientação sobre seus direitos em questões civis.", indices: [12] },
];

const external = { target: "_blank", rel: "noopener noreferrer" };

type Language = "pt" | "en" | "es";
const translations = { pt, en, es };
type Copy = typeof pt.ui;

function RequestLinks({ t }: { t: Copy }) {
  return <div className="request-options">
    <div><a className="action-link primary-action" href={SOCIAL_SUPPORT_URL} {...external}>{t.supportCTA}<span className="sr-only"> ({t.newTab})</span><span aria-hidden="true">↗</span></a><p>{t.supportDescription}</p></div>
    <div><a className="action-link secondary-action" href={HOUSEHOLD_ITEMS_URL} {...external}>{t.itemsCTA}<span className="sr-only"> ({t.newTab})</span><span aria-hidden="true">↗</span></a><p>{t.itemsDescription}</p><p className="donation-note">{t.availability}</p></div>
  </div>;
}

export default function Index() {
  const [language, setLanguage] = useState<Language>(() => {
    try { const saved = localStorage.getItem("missions-language"); return saved === "en" || saved === "es" ? saved : "pt"; }
    catch { return "pt"; }
  });
  const copy = translations[language];
  const t = copy.ui;
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
    document.title = `${t.ministry} — New Life Church Framingham`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.intro);
    try { localStorage.setItem("missions-language", language); } catch { /* Storage may be disabled. */ }
  }, [language, t]);

  return <div className="missions-site">
    <a className="skip-link" href="#conteudo">{t.skip}</a>
    <header className="site-header">
      <nav className="site-container nav-inner" aria-label={t.nav}>
        <a href="#inicio" className="wordmark" aria-label={`New Life Church — ${t.home}`}><BannerArtwork name="logo" className="church-logo" /><small>{t.ministry.toUpperCase()} · FRAMINGHAM</small></a>
        <div className="nav-links"><a href="#servicos">{t.services}</a><a href="#como-funciona">{t.how}</a><a href="#contato">{t.contact}</a></div>
        <div className="header-actions">
          <div className="language-control" role="group" aria-label="Idioma / Language / Idioma">{([{ code: "pt", label: "Português", lang: "pt-BR" }, { code: "en", label: "English", lang: "en" }, { code: "es", label: "Español", lang: "es" }] as const).map(option => <button key={option.code} type="button" lang={option.lang} aria-pressed={language === option.code} onClick={() => setLanguage(option.code)}>{option.label}</button>)}</div>
          <a className="action-link primary-action nav-action" href={SOCIAL_SUPPORT_URL} {...external}>{t.support}<span className="sr-only"> ({t.newTab})</span><span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
    <main id="conteudo">
      <section className="site-container hero" id="inicio">
        <div><p className="eyebrow">NEW LIFE CHURCH · FRAMINGHAM</p><h1 className="ministry-welcome">{t.welcome}</h1><p className="hero-reassurance">{t.heroStart} <span>— {t.heroEnd}</span></p><p className="hero-description">{t.intro}</p><RequestLinks t={t} /></div>
        <aside className="welcome-panel" aria-label={t.welcomeEyebrow}>
          <span className="panel-symbol" aria-hidden="true">↗</span><p className="eyebrow">{t.welcomeEyebrow}</p><h2>{t.welcomeTitle}</h2><p>{t.welcomeText}</p><a href="#servicos">{t.browse} ↓</a>
          <img className="welcome-church" src={churchIllustration} alt="" width={2172} height={724} />
        </aside>
      </section>
      <section className="services-section" id="servicos"><div className="site-container">
        <div className="section-heading"><div><p className="eyebrow">{t.servicesEyebrow}</p><h2>{t.servicesTitle}</h2></div><span className="service-count">{programs.length} {t.serviceWord} · {groups.length} {t.areaWord}</span></div>
        <nav className="category-nav" aria-label={t.categories}>{groups.map((group, i) => <a href={"#" + group.id} key={group.id}><BannerArtwork name={group.icon} className="category-icon" /><span>{copy.groups[i]![0]}</span><span className="category-arrow" aria-hidden="true">↓</span></a>)}</nav>
        {groups.map((group, groupIndex) => <section className="service-group" id={group.id} key={group.id} aria-labelledby={group.id + "-title"}>
          <div className="group-heading"><BannerArtwork name={group.icon} className="service-icon" /><div><h3 id={group.id + "-title"}>{copy.groups[groupIndex]![0]}</h3><p>{copy.groups[groupIndex]![1]}</p></div></div>
          <div className="program-grid">{group.indices.map(index => {
            const program = programs[index]!;
            const title = language === "pt" ? program.title : copy.programs[index]![0]!;
            const audience = language === "pt" ? program.forWho : copy.programs[index]![1]!;
            const label = program.icon === "legal" ? t.legalCTA : program.requestType === "household-items" ? t.itemsServiceCTA : t.serviceCTA;
            return <article className="program-card" key={program.title}>
              {program.img ? <img src={program.img} alt="" loading="lazy" width={768} height={576} /> : <div className="program-icon-banner"><BannerArtwork name={program.icon ?? group.icon} /></div>}
              <div className="program-content"><div className="program-title"><BannerArtwork name={program.icon ?? (index === 6 ? "documents" : group.icon)} className="card-icon" /><h4>{title}</h4></div><p className="program-audience">{audience}</p><p>{program[language]}</p>
                <a className="service-action" href={program.requestUrl ?? (program.requestType === "household-items" ? HOUSEHOLD_ITEMS_URL : SOCIAL_SUPPORT_URL)} {...external} aria-label={`${label}: ${title} (${t.newTab})`}>{label}<span aria-hidden="true">↗</span></a>
                {program.requestType === "household-items" && <p className="donation-note">{t.availability}</p>}
              </div>
            </article>;
          })}</div>
        </section>)}
      </div></section>
      <section className="site-container steps-section" id="como-funciona"><p className="eyebrow">{t.nextStep}</p><h2>{t.stepsTitle}</h2><ol className="steps"><li><h3><span className="step-number">01:</span> {t.step1}</h3><p>{t.step1Text}</p></li><li><h3><span className="step-number">02:</span> {t.step2}</h3><p>{t.step2Text}</p></li><li><h3><span className="step-number">03:</span> {t.step3}</h3><p>{t.step3Text}</p></li></ol><p className="availability-note">{t.availability}</p></section>
      <section className="site-container contact-section" id="contato"><div><p className="eyebrow">{t.contactEyebrow}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><RequestLinks t={t} /></div><aside><h3>{t.questions}</h3><p>{t.phone}</p><a href="tel:+15082037681">(508) 203-7681</a><p>{t.email}</p><a href="mailto:um@newlifeus.com">um@newlifeus.com ↗</a></aside></section>
    </main>
    <div className="site-container church-art"><img src={churchIllustration} alt={t.churchAlt} width={2172} height={724} loading="lazy" /></div>
    <footer className="site-container site-footer"><div><strong>NEW LIFE CHURCH</strong><p>{t.ministry} · Framingham</p></div><p>Hope in motion.</p><a href="#inicio">{t.back} ↑</a></footer>
  </div>;
}
