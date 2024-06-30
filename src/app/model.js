import onChange from "on-change";
import View from "./view";
import urlValidator from './validators/url';
import duplicateFeedValidator from "./validators/duplicate-feed";

const state = {
    feeds: [],
    addRSSForm: {
        status: 'no-touched', // 'no-touched' | 'successful' | 'failed'
        value: '',
    }
}

export default function() {
    const view = new View();

    const changeHandler = (path, value) => {
        switch (path) {
            case 'addRSSForm.status': {
                if (value === 'submitted') {
                    Promise.all([
                        urlValidator(state.addRSSForm.value),
                        duplicateFeedValidator(state.feeds, state.addRSSForm.value)
                    ])
                        .then(() => {
                            state.feeds = [...state.feeds, { url: state.addRSSForm.value }];
                            state.addRSSForm.status = 'successful';
                            state.addRSSForm.value = '';
                            view.setAddRSSFormMessage(state, 'RSS успешно загружен');
                        })
                        .catch((message) => {
                            state.addRSSForm.status = 'failed';
                            view.setAddRSSFormMessage(state, message);
                        })
                }
            }
        }
    }

    view.init(onChange(state, changeHandler));
}
