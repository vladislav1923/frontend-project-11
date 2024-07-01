import onChange from "on-change";
import View from "./view";
import i18n from 'i18next';
import resources from './locales';
import { urlValidator, duplicateFeedValidator } from "./validators";


const state = {
    lng: 'ru',
    feeds: [],
    addRSSForm: {
        status: 'no-touched', // 'no-touched' | 'successful' | 'failed'
        value: '',
    }
}

export default async function() {
    const view = new View();
    const i18nextInstance = i18n.createInstance();
    await i18nextInstance.init({
        lng: state.lng,
        resources,
    });

    const changeHandler = async (path, value) => {
        switch (path) {
            case 'addRSSForm.status': {
                if (value === 'submitted') {
                    Promise.all([
                        urlValidator(
                            state.addRSSForm.value,
                            await i18nextInstance.t('addRSSForm.urlError'),
                        ),
                        duplicateFeedValidator(
                            state.feeds,
                            state.addRSSForm.value,
                            await i18nextInstance.t('addRSSForm.duplicateFeedError'),
                        )
                    ])
                        .then(async () => {
                            state.feeds = [...state.feeds, { url: state.addRSSForm.value }];
                            state.addRSSForm.status = 'successful';
                            state.addRSSForm.value = '';
                            view.setAddRSSFormMessage(
                                state,
                                await i18nextInstance.t('addRSSForm.successMessage'),
                            );
                        })
                        .catch((message) => {
                            state.addRSSForm.status = 'failed';
                            view.setAddRSSFormMessage(state, message);
                        })
                }
            }
        }
    }

    view.init();
    view.initAddRSSForm(onChange(state, changeHandler));
    await view.renderTexts(i18nextInstance);
}
