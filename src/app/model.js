import onChange from "on-change";
import View from "./view";
import i18nLib from 'i18next';
import { setIntervalAsync } from 'set-interval-async';
import resources from './locales';
import { urlValidator, duplicateFeedValidator } from "./validators";
import { fetchPosts, parseXML, parseRSS, extractNewPosts } from "./services";

const state = {
    lng: 'ru',
    feeds: [],
    posts: [],
    readPostsIds: [],
    addRSSForm: {
        status: 'no-touched', // 'no-touched' | 'successful' | 'failed'
        value: '',
    },
    modal: {
        open: false,
        postId: null
    }
}

export default async function() {
    const view = new View();
    const i18n = i18nLib.createInstance();
    await i18n.init({
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
                            await i18n.t('addRSSForm.urlError'),
                        ),
                        duplicateFeedValidator(
                            state.feeds,
                            state.addRSSForm.value,
                            await i18n.t('addRSSForm.duplicateFeedError'),
                        )
                    ])
                        .then(async () => fetchPosts(
                            state.addRSSForm.value,
                            await i18n.t('addRSSForm.fetchingError')
                        ))
                        .then(async (response) => parseXML(
                            response.data.contents,
                            await i18n.t('addRSSForm.parsingError')
                        ))
                        .then(async (elements) => {
                            const parsed = parseRSS(elements);
                            state.feeds = [...state.feeds, { ...parsed.feed, url: state.addRSSForm.value }];
                            state.posts = [...state.posts, ...parsed.posts];
                            state.addRSSForm.status = 'successful';
                            state.addRSSForm.value = '';
                            view.setAddRSSFormMessage(
                                state,
                                await i18n.t('addRSSForm.successMessage'),
                            );
                            await view.renderFeeds(state, i18n);
                        })
                        .catch((message) => {
                            state.addRSSForm.status = 'failed';
                            view.setAddRSSFormMessage(state, message);
                        })
                }
                break;
            }
            case 'readPostsIds': {
                view.markPostsAsRead(value);
                break
            }
            case 'modal.postId': {
                if (state.modal.open) {
                    const post = state.posts.find((post) => post.id === state.modal.postId);
                    await view.openModal(post, i18n);
                } else {
                    view.closeModal();
                }
                break;
            }
            default:
                break;
        }
    }

    const watchedState = onChange(state, changeHandler);

    view.init();
    view.initAddRSSForm(watchedState);
    view.initPosts(watchedState);
    view.initModal(watchedState);
    await view.renderTexts(i18n);

    setIntervalAsync(async () => {
        const promises = state.feeds.map(async (feed) => {
            return fetchPosts(feed.url)
                .then(async (response) => parseXML(response.data.contents))
                .then(async (elements) => {
                    const parsed = parseRSS(elements);
                    const newPosts = extractNewPosts(state.posts, parsed.posts);
                    if (newPosts.length) {
                        state.posts = [...newPosts, ...state.posts];
                        await view.renderFeeds(state, i18n);
                    }
                });
        });
        await Promise.all(promises);
    }, 5000);
}
