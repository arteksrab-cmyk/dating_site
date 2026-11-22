import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type Language = 'en' | 'ru';
type ConsentChoice = 'essential' | 'all';

const STORAGE_KEY = 'a-little-closer.cookie-preferences';

function loadChoice(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'essential' || value === 'all' ? value : null;
  } catch {
    return null;
  }
}

export function CookieConsent({
  language,
  settingsOpen,
  onOpenSettings,
  onCloseSettings,
}: {
  language: Language;
  settingsOpen: boolean;
  onOpenSettings: () => void;
  onCloseSettings: () => void;
}) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    setChoice(loadChoice());
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextChoice);
    } catch {
      // The page still works if the browser blocks local storage.
    }
    setChoice(nextChoice);
    onCloseSettings();
  };

  const copy = language === 'en' ? {
    heading: 'Your privacy choices',
    message: 'This page currently uses no analytics or advertising cookies. We store your choice in this browser so this notice does not keep appearing.',
    accept: 'Accept all',
    essential: 'Essential only',
    settings: 'Details',
    title: 'Cookie and browser-storage choices',
    close: 'Close settings',
    essentialTitle: 'Remember this choice',
    essentialText: 'A small local-storage entry remembers your selection. It is not used to track you.',
    optionalTitle: 'Optional analytics and advertising',
    optionalText: 'No optional analytics or advertising tools are active on this page. If that changes, they will only run according to your saved choice and the updated notice.',
    done: 'Save my choice',
    allow: 'Allow optional tools',
    note: 'The partner website is separate and may use its own cookies under its own privacy notice.',
  } : {
    heading: 'Ваши настройки приватности',
    message: 'Сейчас на странице нет аналитических или рекламных cookie. Ваш выбор сохраняется в этом браузере, чтобы уведомление не появлялось снова.',
    accept: 'Разрешить всё',
    essential: 'Только необходимое',
    settings: 'Подробнее',
    title: 'Настройки cookie и браузерного хранилища',
    close: 'Закрыть настройки',
    essentialTitle: 'Запомнить выбор',
    essentialText: 'Небольшая запись в локальном хранилище запоминает ваш выбор и не используется для отслеживания.',
    optionalTitle: 'Необязательная аналитика и реклама',
    optionalText: 'Сейчас на странице нет аналитических или рекламных инструментов. Если это изменится, они будут работать только с учётом сохранённого выбора и обновлённого уведомления.',
    done: 'Сохранить мой выбор',
    allow: 'Разрешить необязательные',
    note: 'Сайт партнёра — отдельный сервис; он может использовать свои cookie и собственную политику конфиденциальности.',
  };

  return (
    <>
      {choice === null && (
        <section className="cookie-banner" aria-label={copy.heading}>
          <div className="cookie-banner-copy">
            <strong>{copy.heading}</strong>
            <p>{copy.message}</p>
          </div>
          <div className="cookie-actions">
            <button type="button" onClick={() => saveChoice('essential')}>{copy.essential}</button>
            <button type="button" onClick={onOpenSettings}>{copy.settings}</button>
            <button type="button" className="cookie-primary" onClick={() => saveChoice('all')}>{copy.accept}</button>
          </div>
        </section>
      )}

      {settingsOpen && (
        <div className="cookie-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) onCloseSettings();
        }}>
          <section className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title">
            <div className="cookie-dialog-header">
              <div>
                <h2 id="cookie-dialog-title">{copy.title}</h2>
                <p>{copy.message}</p>
              </div>
              <button type="button" className="dialog-close" aria-label={copy.close} onClick={onCloseSettings}><X size={18} /></button>
            </div>
            <div className="cookie-preference">
              <input type="checkbox" checked readOnly aria-label={copy.essentialTitle} />
              <div>
                <strong>{copy.essentialTitle}</strong>
                <p>{copy.essentialText}</p>
              </div>
            </div>
            <div className="cookie-preference">
              <input type="checkbox" checked={choice === 'all'} onChange={(event) => setChoice(event.target.checked ? 'all' : 'essential')} aria-label={copy.optionalTitle} />
              <div>
                <strong>{copy.optionalTitle}</strong>
                <p>{copy.optionalText}</p>
              </div>
            </div>
            <p className="cookie-footnote">{copy.note}</p>
            <div className="cookie-actions">
              <button type="button" onClick={() => saveChoice(choice === 'all' ? 'all' : 'essential')}>{copy.done}</button>
              <button type="button" className="cookie-primary" onClick={() => saveChoice('all')}>{copy.allow}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
