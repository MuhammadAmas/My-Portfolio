import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

export const logPageView = (pageName, pageTitle) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: window.location.pathname,
      custom_page_name: pageName
    });
  }
};

export const logCustomEvent = (eventName, parameters = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

export const trackButtonClick = (buttonName, section = null) => {
  logCustomEvent('button_click', {
    button_name: buttonName,
    section: section
  });
};

export const trackContactFormEvent = (action, method = null) => {
  logCustomEvent('contact_form_interaction', {
    action: action,
    contact_method: method
  });
};

export const trackProjectView = (projectName) => {
  logCustomEvent('project_view', {
    project_name: projectName
  });
};

export const trackPublicationView = (publicationTitle) => {
  logCustomEvent('publication_view', {
    publication_title: publicationTitle
  });
};

export const trackExternalLink = (linkUrl, linkText) => {
  logCustomEvent('external_link_click', {
    link_url: linkUrl,
    link_text: linkText
  });
};

export const trackResumeDownload = () => {
  logCustomEvent('resume_download');
};