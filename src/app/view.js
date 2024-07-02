import Controller from "./controller";
import {getFeedsHTML, getModalBGHTML, getModalHTML, getPostsHTML} from './services';

export const ADD_RSS_SECTION_ID = 'add-rss-section';
export const ADD_RSS_FORM_ID = 'add-rss-form';
export const ADD_RSS_INPUT_ID = 'add-rss-input';
export const ADD_RSS_MESSAGE_ID = 'add-rss-message';
export const ADD_RSS_EXAMPLE_ID = 'add-rss-example';
export const FEEDS_SECTION_ID = 'feeds-section';
export const MODAL_ID = 'modal';

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

    initPosts(state) {
        this.controller.setPostsHandlers(state);
    }

    initModal(state) {
        this.modal = document.getElementById(MODAL_ID);
        this.controller.setModalHandlers(state);
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

    markPostsAsRead(posts) {
        posts.forEach((id) => {
            const post = document.getElementById(id);
            post.classList.remove('fw-bold');
            post.classList.add('fw-normal', 'link-secondary');
        });
    }

    async openModal(post, i18n) {
        document.body.classList.add('d-flex', 'flex-column', 'min-vh-100', 'modal-open');
        this.modal.style.display = 'block';
        this.modal.querySelector('.modal-title').textContent = post.title;
        this.modal.querySelector('.modal-body').textContent = post.desc;
        this.modal.querySelector('.full-article').textContent = i18n.t('modal.openBtnText');
        this.modal.querySelector('.full-article').setAttribute('href', post.link);
        this.modal.querySelector('.btn-secondary').textContent = i18n.t('modal.closeBtnText');
        this.modal.classList.add('show');
        this.modalBG = await getModalBGHTML();
        document.body.append(this.modalBG);
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.body.classList.remove('d-flex', 'flex-column', 'min-vh-100', 'modal-open');
        this.modal.style.display = 'none';
        this.modal.classList.add('show');
        this.modalBG.remove();
        document.body.style.overflow = 'auto';
    }
}

export default View;
