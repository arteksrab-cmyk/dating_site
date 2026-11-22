import { X } from 'lucide-react';
import { HOSTING_PROVIDER, POLICY_UPDATED, PRIVACY_CONTACT_EMAIL, SITE_BRAND_NAME, SITE_OPERATOR_NAME } from '@/config';

export type LegalPageName = 'privacy' | 'cookies';
type Language = 'en' | 'ru';

const hasPlaceholders = [SITE_OPERATOR_NAME, HOSTING_PROVIDER].some((value) => value.startsWith('['));

export function LegalDialog({
  page,
  language,
  onClose,
}: {
  page: LegalPageName | null;
  language: Language;
  onClose: () => void;
}) {
  if (!page) return null;

  const english = language === 'en';
  const copy = english ? {
    privacyTitle: 'Privacy notice',
    cookiesTitle: 'Cookie notice',
    updated: `Last updated: ${POLICY_UPDATED}`,
    close: 'Close',
    warning: 'Before launch: replace the actual site owner and hosting details in the site configuration. The public brand name is not the legal operator. Confirm the host’s access-log practices and the exact partner tracking link. Do not publish this draft with placeholders.',
    privacyIntro: `This independent introduction page, branded ${SITE_BRAND_NAME}, is operated by ${SITE_OPERATOR_NAME}. Privacy contact: ${PRIVACY_CONTACT_EMAIL}. It is a referral page, not a dating service, and it does not create user accounts.`,
    privacyAnswersTitle: 'Answers and information you provide',
    privacyAnswers: 'The three quiz answers and age confirmation are held only in the open page’s memory. They are not submitted to this site, stored in a database, or saved in browser storage. Closing or refreshing the page clears them.',
    privacyTechTitle: 'Technical information and hosting',
    privacyTech: `The page is hosted by ${HOSTING_PROVIDER}. The hosting provider or server operator may process technical request information such as IP address, date and time, requested URL, browser details and security logs. Confirm the provider, its privacy notice, the location of processing and log-retention period before launch.`,
    privacyPartnerTitle: 'Partner link',
    privacyPartner: 'If you choose the partner link, your browser leaves this page and opens the partner’s site. The destination may receive the referral URL and its affiliate parameters, and may collect information or use cookies under its own privacy notice. This page operator does not control the partner’s processing.',
    privacyRightsTitle: 'Contact and requests',
    privacyRights: `For privacy questions or requests about processing controlled by this page operator, contact ${PRIVACY_CONTACT_EMAIL}. The operator should review and respond to requests under the laws that apply to the operator and the visitor.`,
    privacyAgeTitle: 'Adults only',
    privacyAge: 'This page is intended for adults aged 18 or over. It is not designed for children and does not knowingly ask children to provide personal data.',
    cookiesIntro: 'This page currently does not load analytics, advertising, social-media or other optional tracking cookies.',
    cookiesStorageTitle: 'Browser storage used by this page',
    cookiesStorage: 'The page saves your cookie choice in local browser storage under the key “a-little-closer.cookie-preferences” so the notice can remember your decision. It stores only “essential” or “all”; it is not used to identify or track you. You can clear it in your browser settings or reopen “Cookie settings” from the page footer.',
    cookiesOptionalTitle: 'Optional tools',
    cookiesOptional: 'No optional analytics or advertising tools are currently active, so choosing “Accept all” does not turn on a tracking tool on this version of the page. If optional tools are added later, this notice and the consent behavior must be reviewed and updated before they are enabled.',
    cookiesPartnerTitle: 'Partner website',
    cookiesPartner: 'The partner website is outside this page and may set its own cookies or similar technologies. Review the partner’s cookie and privacy notices after leaving this site.',
  } : {
    privacyTitle: 'Политика конфиденциальности',
    cookiesTitle: 'Уведомление о cookie',
    updated: `Обновлено: ${POLICY_UPDATED}`,
    close: 'Закрыть',
    warning: 'До запуска: замените в настройках сайта фактические данные владельца и хостинга. Название бренда не является именем юридического оператора. Проверьте практики хостинга по журналам доступа и фактическую партнёрскую ссылку. Не публикуйте эту версию с незаполненными полями.',
    privacyIntro: `Этой независимой вводной страницей под брендом ${SITE_BRAND_NAME} управляет ${SITE_OPERATOR_NAME}. Контакт по вопросам приватности: ${PRIVACY_CONTACT_EMAIL}. Это партнёрская страница-переход, а не сервис знакомств; аккаунты здесь не создаются.`,
    privacyAnswersTitle: 'Ответы и сведения, которые вы вводите',
    privacyAnswers: 'Три ответа на вопросы и подтверждение возраста остаются только в памяти открытой страницы. Они не отправляются этому сайту, не записываются в базу данных и не сохраняются в браузерном хранилище. После закрытия или обновления страницы ответы исчезают.',
    privacyTechTitle: 'Технические данные и хостинг',
    privacyTech: `Страница размещена у ${HOSTING_PROVIDER}. Хостинг-провайдер или оператор сервера может обрабатывать технические данные запросов: IP-адрес, дату и время, запрошенный адрес, сведения о браузере и журналы безопасности. До запуска уточните провайдера, его политику конфиденциальности, место обработки и срок хранения журналов.`,
    privacyPartnerTitle: 'Переход к партнёру',
    privacyPartner: 'При переходе по партнёрской ссылке браузер покидает эту страницу и открывает сайт партнёра. Сайт назначения может получить адрес перехода и партнёрские параметры, а также самостоятельно собирать сведения или использовать cookie по своей политике. Владелец этой страницы не управляет обработкой у партнёра.',
    privacyRightsTitle: 'Контакт и обращения',
    privacyRights: `По вопросам приватности или обработки, за которую отвечает владелец этой страницы, напишите на ${PRIVACY_CONTACT_EMAIL}. Владелец должен рассматривать запросы с учётом законов, применимых к нему и посетителю.`,
    privacyAgeTitle: 'Только для взрослых',
    privacyAge: 'Страница предназначена для посетителей от 18 лет. Она не рассчитана на детей и не запрашивает у детей персональные данные.',
    cookiesIntro: 'Сейчас эта страница не загружает аналитику, рекламные, социальные или другие необязательные отслеживающие cookie.',
    cookiesStorageTitle: 'Хранилище браузера на этой странице',
    cookiesStorage: 'Страница сохраняет выбор cookie в локальном хранилище браузера под ключом «a-little-closer.cookie-preferences», чтобы запомнить решение. Сохраняется только значение «essential» или «all»; запись не используется для идентификации или отслеживания. Её можно удалить в настройках браузера или изменить через «Настройки cookie» внизу страницы.',
    cookiesOptionalTitle: 'Необязательные инструменты',
    cookiesOptional: 'Сейчас аналитика и реклама не подключены, поэтому выбор «Разрешить всё» сам по себе не включает отслеживание в этой версии страницы. Если позднее будут добавлены необязательные инструменты, до их включения нужно пересмотреть это уведомление и логику согласия.',
    cookiesPartnerTitle: 'Сайт партнёра',
    cookiesPartner: 'Сайт партнёра не относится к этой странице и может устанавливать собственные cookie или похожие технологии. После перехода прочитайте его уведомления о cookie и конфиденциальности.',
  };

  const isPrivacy = page === 'privacy';
  return (
    <div className="legal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <article className="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-dialog-title">
        <header className="legal-dialog-header">
          <div>
            <h2 id="legal-dialog-title">{isPrivacy ? copy.privacyTitle : copy.cookiesTitle}</h2>
            <p className="legal-meta">{copy.updated}</p>
          </div>
          <button type="button" className="dialog-close" aria-label={copy.close} onClick={onClose}><X size={18} /></button>
        </header>
        {hasPlaceholders && <p className="legal-warning">{copy.warning}</p>}
        {isPrivacy ? (
          <>
            <p>{copy.privacyIntro}</p>
            <h3>{copy.privacyAnswersTitle}</h3><p>{copy.privacyAnswers}</p>
            <h3>{copy.privacyTechTitle}</h3><p>{copy.privacyTech}</p>
            <h3>{copy.privacyPartnerTitle}</h3><p>{copy.privacyPartner}</p>
            <h3>{copy.privacyRightsTitle}</h3><p>{copy.privacyRights}</p>
            <h3>{copy.privacyAgeTitle}</h3><p>{copy.privacyAge}</p>
          </>
        ) : (
          <>
            <p>{copy.cookiesIntro}</p>
            <h3>{copy.cookiesStorageTitle}</h3><p>{copy.cookiesStorage}</p>
            <h3>{copy.cookiesOptionalTitle}</h3><p>{copy.cookiesOptional}</p>
            <h3>{copy.cookiesPartnerTitle}</h3><p>{copy.cookiesPartner}</p>
          </>
        )}
      </article>
    </div>
  );
}
