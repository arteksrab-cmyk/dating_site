import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowLeft, ArrowRight, ExternalLink, HeartHandshake, LockKeyhole, RotateCcw, Sparkles } from 'lucide-react';
import { PARTNER_URL, SITE_BRAND_NAME } from '@/config';
import { CookieConsent } from '@/components/cookie-consent';
import { LegalDialog, type LegalPageName } from '@/pages/legal';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function isHttpsDestination(value: string) {
  if (!value || value !== value.trim()) return false;

  try {
    const destination = new URL(value);
    return destination.protocol === 'https:' && destination.hostname.length > 0;
  } catch {
    return false;
  }
}

function Home({
  cookieSettingsOpen,
  setCookieSettingsOpen,
}: {
  cookieSettingsOpen: boolean;
  setCookieSettingsOpen: (open: boolean) => void;
}) {
  const language = 'en' as const;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
  const [isAdult, setIsAdult] = useState(false);
  const [legalPage, setLegalPage] = useState<LegalPageName | null>(null);
  const isReady = isHttpsDestination(PARTNER_URL);

  const copy = language === 'en' ? {
    brand: SITE_BRAND_NAME,
    private: 'Your answers stay in this tab',
    eyebrow: 'A small pause, for you',
    headline: <>Make room for<br /><em>what feels right.</em></>,
    intro: 'A few thoughtful questions can help you name what you want from a connection. No profiles, no pressure. Just a moment to get clear.',
    minutes: 'About a minute',
    steps: 'Three gentle questions',
    quizLabel: 'A moment of reflection',
    questionOf: (n: number) => `QUESTION 0${n} / 03`,
    questions: [
      { title: 'What would feel good to find right now?', caption: 'There is no wrong answer. Choose the one that feels most like you.', options: ['A thoughtful conversation', 'A steady, meaningful connection', 'Someone to share everyday life with', 'I am still figuring that out'] },
      { title: 'What matters most as you get to know someone?', caption: 'Think about the feeling you would want to carry into a first conversation.', options: ['Ease and a sense of humour', 'Honesty and emotional openness', 'Shared values and curiosity', 'Taking things at my own pace'] },
      { title: 'How would you like to begin?', caption: 'Your answer is only for you. It will not be sent anywhere.', options: ['One good conversation at a time', 'With clarity about what we both want', 'Open-minded, and see how it feels', 'I would like to think about it more'] },
    ],
    continue: 'Continue', reflectionButton: 'See your reflection', back: 'Back', choose: 'Choose one to continue', stored: 'Your choices are only held in this page while it is open.',
    resultKicker: 'A thought to take with you',
    resultTitle: 'Clarity is a good place to begin.',
    resultBody: 'You have taken a moment to notice what matters to you. If you would like to explore further, you can choose to visit an independent dating service next.',
    adult: 'I confirm that I am 18 years of age or older.',
    visit: 'Visit partner dating site',
    owner: 'The partner link has not been added yet. The page owner must add an HTTPS destination in src/config.ts before this button can be used.',
    partner: 'This opens the partner’s website in a new tab. The partner has its own terms and privacy policy.',
    restart: 'Start again',
    sectionLabel: 'A kinder starting point',
    sectionTitle: <>Dating can begin with<br /><em>a question, not a pitch.</em></>,
    sectionBody: 'This page is here to help you pause and consider what you are looking for. It is not a dating platform, and it does not create a profile or promise an introduction.',
    promises: [
      ['01', 'No performance required', 'There are no profiles to browse here, and nothing to prove. Answer only what feels useful.'],
      ['02', 'Your answers stay yours', 'Your choices remain in temporary page memory. They are never sent to us or saved.'],
      ['03', 'You choose what happens next', 'The next step is optional. You can leave this page at any time without sharing anything.'],
    ],
    disclosure: 'Affiliate disclosure: this page may receive compensation if you choose to visit or use the partner service. That does not change your answers or guarantee any outcome.',
    footer: 'An independent introduction page. Not a dating platform.',
    privacyLink: 'Privacy notice',
    cookieLink: 'Cookie notice',
    cookieSettings: 'Cookie settings',
    copyright: `© 2026 ${SITE_BRAND_NAME}.`,
    disclosureHeading: 'Affiliate disclosure',
    languageLabel: 'Language',
  } : {
    brand: SITE_BRAND_NAME,
    private: 'Ответы остаются в этой вкладке',
    eyebrow: 'Небольшая пауза для себя',
    headline: <>Освободите место<br /><em>для своего.</em></>,
    intro: 'Несколько простых вопросов помогут понять, чего вы ждёте от близости. Без анкет и давления — только время, чтобы прислушаться к себе.',
    minutes: 'Около минуты',
    steps: 'Три спокойных вопроса',
    quizLabel: 'Небольшое размышление',
    questionOf: (n: number) => `ВОПРОС 0${n} / 03`,
    questions: [
      { title: 'Что было бы для вас важным сейчас?', caption: 'Здесь нет неправильного ответа. Выберите то, что вам ближе.', options: ['Внимательный разговор', 'Надёжная и значимая связь', 'Человек для повседневной жизни', 'Я пока пытаюсь разобраться'] },
      { title: 'Что для вас важно в начале знакомства?', caption: 'Подумайте о чувстве, которое хотелось бы сохранить в первом разговоре.', options: ['Лёгкость и чувство юмора', 'Честность и открытость', 'Общие ценности и любознательность', 'Возможность не торопиться'] },
      { title: 'С чего вам хотелось бы начать?', caption: 'Ответ останется только у вас и никуда не отправится.', options: ['С одного хорошего разговора', 'С ясности о взаимных ожиданиях', 'Открыто, посмотрим, как пойдёт', 'Я хочу ещё подумать'] },
    ],
    continue: 'Далее', reflectionButton: 'Посмотреть итог', back: 'Назад', choose: 'Выберите вариант, чтобы продолжить', stored: 'Ответы хранятся только в памяти страницы, пока она открыта.',
    resultKicker: 'Мысль, которую можно оставить себе',
    resultTitle: 'Ясность — хорошее начало.',
    resultBody: 'Вы нашли минуту, чтобы заметить, что для вас важно. Если захотите продолжить, можно перейти к независимому сервису знакомств.',
    adult: 'Подтверждаю, что мне исполнилось 18 лет.',
    visit: 'Перейти на сайт знакомств',
    owner: 'Ссылка на партнёра пока не добавлена. Чтобы включить кнопку, владелец страницы должен указать HTTPS-адрес в src/config.ts.',
    partner: 'Сайт партнёра откроется в новой вкладке. У партнёра свои условия и политика конфиденциальности.',
    restart: 'Начать сначала',
    sectionLabel: 'Бережное начало',
    sectionTitle: <>Знакомство может начаться<br /><em>с вопроса, а не обещания.</em></>,
    sectionBody: 'Эта страница помогает остановиться и подумать о том, что вы ищете. Это не сервис знакомств: здесь нельзя создать профиль и никто не обещает знакомство.',
    promises: [
      ['01', 'Не нужно соответствовать', 'Здесь нет анкет, которые нужно просматривать, и ничего не нужно доказывать. Отвечайте только на то, что вам полезно.'],
      ['02', 'Ответы остаются у вас', 'Выбор хранится только во временной памяти страницы. Он не отправляется и не сохраняется.'],
      ['03', 'Решение за вами', 'Следующий шаг необязателен. Вы можете закрыть страницу в любой момент, ничего не сообщая.'],
    ],
    disclosure: 'Партнёрское раскрытие: страница может получить вознаграждение, если вы перейдёте к партнёрскому сервису или воспользуетесь им. Это не влияет на ваши ответы и не гарантирует результат.',
    footer: 'Независимая страница-знакомство. Не сервис знакомств.',
    privacyLink: 'Конфиденциальность',
    cookieLink: 'Файлы cookie',
    cookieSettings: 'Настройки cookie',
    copyright: `© 2026 ${SITE_BRAND_NAME}.`,
    disclosureHeading: 'Партнёрское раскрытие',
    languageLabel: 'Язык',
  };

  const selectAnswer = (index: number) => {
    setAnswers((current) => current.map((answer, i) => i === step ? index : answer));
  };

  const proceed = () => {
    if (step < 3) setStep((current) => current + 1);
  };

  const restart = () => {
    setStep(0);
    setAnswers([-1, -1, -1]);
    setIsAdult(false);
  };

  const visitPartner = () => {
    if (!isReady || !isAdult) return;
    window.open(PARTNER_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand" aria-label={copy.brand}>
          <span className="brand-mark"><HeartHandshake size={18} strokeWidth={1.7} /></span>
          <span>{copy.brand}</span>
        </div>
          <div className="top-actions">
          <span className="privacy-label"><LockKeyhole size={13} />{copy.private}</span>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">{copy.eyebrow}</div>
          <h1 id="hero-title">{copy.headline}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-meta">
            <span><Sparkles size={15} />{copy.minutes}</span>
            <span>{copy.steps}</span>
          </div>
        </div>

        <section className="quiz-panel" aria-label={copy.quizLabel}>
          <div className="panel-topline">
            <span>{copy.quizLabel}</span>
            <span className="step-count">{step < 3 ? `${String(step + 1).padStart(2, '0')} / 03` : '03 / 03'}</span>
          </div>
          <div className="progress-track" aria-label={language === 'en' ? `Step ${Math.min(step + 1, 3)} of 3` : `Шаг ${Math.min(step + 1, 3)} из 3`}>
            {[0, 1, 2].map((item) => <span key={item} className={`progress-segment ${item <= step ? 'complete' : ''}`} />)}
          </div>
          {step < 3 ? (
            <div className="question-enter" key={`${language}-${step}`}>
              <h2 id="question-title">{copy.questions[step].title}</h2>
              <p className="question-caption">{copy.questions[step].caption}</p>
              <div role="group" aria-labelledby="question-title" className="choice-list">
                {copy.questions[step].options.map((option, index) => (
                  <button type="button" aria-pressed={answers[step] === index} key={option} className="choice" onClick={() => selectAnswer(index)}>
                    <span>{option}</span><span className="choice-mark" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="quiz-actions">
                {step > 0 ? <button type="button" className="text-button" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={14} /> {copy.back}</button> : <span />}
                <button type="button" className="primary-button" disabled={answers[step] < 0} onClick={proceed}>
                  {step === 2 ? copy.reflectionButton : copy.continue}<ArrowRight size={15} />
                </button>
              </div>
              <p className="answer-note">{answers[step] < 0 ? copy.choose : copy.stored}</p>
            </div>
          ) : (
            <div className="result-view question-enter" key="result">
              <div className="result-kicker">{copy.resultKicker}</div>
              <h2>{copy.resultTitle}</h2>
              <p>{copy.resultBody}</p>
              <label className="age-check">
                <input type="checkbox" checked={isAdult} onChange={(event) => setIsAdult(event.target.checked)} />
                <span>{copy.adult}</span>
              </label>
              <button type="button" className="primary-button" disabled={!isReady || !isAdult} onClick={visitPartner}>
                {copy.visit}<ExternalLink size={14} />
              </button>
              {!isReady && <div className="link-missing" role="note">{copy.owner}</div>}
              <p className="partner-note">{copy.partner}</p>
              <button type="button" className="text-button quiz-reset" onClick={restart}><RotateCcw size={13} /> {copy.restart}</button>
            </div>
          )}
        </section>
      </section>

      <section className="below">
        <div className="reflection">
          <div className="reflection-label">{copy.sectionLabel}</div>
          <div>
            <h2>{copy.sectionTitle}</h2>
            <p>{copy.sectionBody}</p>
          </div>
        </div>
        <div className="promise-row">
          {copy.promises.map(([number, title, body]) => (
            <article className="promise" key={number}>
              <div className="promise-num">{number}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-brand">{copy.footer}</div>
        <p><strong>{copy.disclosureHeading}:</strong> {copy.disclosure} <span className="partner-details">{copy.partner}</span></p>
      </footer>
      <div className="footer-bottom">
        <span>{copy.copyright}</span>
        <nav className="footer-links" aria-label={language === 'en' ? 'Legal information' : 'Правовая информация'}>
          <button type="button" className="footer-link" onClick={() => setLegalPage('privacy')}>{copy.privacyLink}</button>
          <button type="button" className="footer-link" onClick={() => setLegalPage('cookies')}>{copy.cookieLink}</button>
          <button type="button" className="footer-link" onClick={() => setCookieSettingsOpen(true)}>{copy.cookieSettings}</button>
        </nav>
      </div>
      <LegalDialog page={legalPage} language={language} onClose={() => setLegalPage(null)} />
      <CookieConsent
        language={language}
        settingsOpen={cookieSettingsOpen}
        onOpenSettings={() => setCookieSettingsOpen(true)}
        onCloseSettings={() => setCookieSettingsOpen(false)}
      />
    </main>
  );
}

function Router({
  cookieSettingsOpen,
  setCookieSettingsOpen,
}: {
  cookieSettingsOpen: boolean;
  setCookieSettingsOpen: (open: boolean) => void;
}) {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={() => <Home cookieSettingsOpen={cookieSettingsOpen} setCookieSettingsOpen={setCookieSettingsOpen} />} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router cookieSettingsOpen={cookieSettingsOpen} setCookieSettingsOpen={setCookieSettingsOpen} />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
