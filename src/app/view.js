import Controller from "./controller";
import { getFeedsHTML, getPostsHTML } from './services';

export const ADD_RSS_SECTION_ID = 'add-rss-section';
export const ADD_RSS_FORM_ID = 'add-rss-form';
export const ADD_RSS_INPUT_ID = 'add-rss-input';
export const ADD_RSS_MESSAGE_ID = 'add-rss-message';
export const ADD_RSS_EXAMPLE_ID = 'add-rss-example';
export const FEEDS_SECTION_ID = 'feeds-section';

class View {
    init() {
        this.controller = new Controller();
        this.controller.init(this);
    }

    initAddRSSForm(state) {
        this.addRSSSection = document.getElementById(ADD_RSS_SECTION_ID);
        this.addRSSForm = document.getElementById(ADD_RSS_FORM_ID);
        this.addRSSInput = document.getElementById(ADD_RSS_INPUT_ID);
        this.addRSSMessage = document.getElementById(ADD_RSS_MESSAGE_ID);
        this.feedsSection = document.getElementById(FEEDS_SECTION_ID);

        this.addRSSInput.focus();
        this.controller.setAddRSSFormHandlers(state);
    }

    async renderTexts(i18n) {
        document.title = await i18n.t('global.title');

        this.addRSSSection.querySelector('h1').textContent = await i18n.t('addRSSForm.title');
        this.addRSSSection.querySelector('.lead').textContent = await i18n.t('addRSSForm.lead');
        this.addRSSInput.setAttribute('placeholder', await i18n.t('addRSSForm.placeholder'));
        this.addRSSSection.querySelector('label').textContent = await i18n.t('addRSSForm.label');
        this.addRSSSection.querySelector('button').textContent = await i18n.t('addRSSForm.btnText');
        this.addRSSSection.querySelector(`#${ADD_RSS_EXAMPLE_ID}`).textContent = await i18n.t('addRSSForm.example');
    }

    setAddRSSFormMessage(state, message) {
        this.addRSSMessage.textContent = message;
        switch (state.addRSSForm.status) {
            case 'failed':
                this.addRSSMessage.classList.add('text-danger');
                this.addRSSInput.classList.add('is-invalid');
                break;
            case 'successful':
                this.addRSSForm.reset();
                this.addRSSInput.focus();
                this.addRSSMessage.classList.remove('text-danger');
                this.addRSSMessage.classList.add('text-success');
                this.addRSSInput.classList.remove('is-invalid');
                break;
            default:
                break;
        }
    }

    async renderFeeds(state, i18n) {
        this.feedsSection.innerHTML = '';
        const row = document.createElement('div');
        row.classList.add('row');
        row.replaceChildren(
            await getPostsHTML(state.posts, i18n),
            await getFeedsHTML(state.feeds, i18n),
        )
        this.feedsSection.append(row);
    }
}

export default View;
