const getCard = (title, items) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = title;
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  list.replaceChildren(...items);
  cardBody.append(h2);
  card.replaceChildren(cardBody, list);

  return card;
};

export const getPostsHTML = async (posts, i18n) => {
  const title = await i18n.t('feeds.postsTitle');
  const btnText = await i18n.t('feeds.postBtnText');
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('col-md-10', 'col-lg-8', 'order-1', 'mx-auto', 'posts');

  const items = posts.map((post) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const anchor = document.createElement('a');
    anchor.classList.add('fw-bold');
    anchor.setAttribute('href', post.link);
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener noreferrer');
    anchor.setAttribute('id', post.id);
    anchor.setAttribute('role', 'post-anchor');
    anchor.textContent = post.title;
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-post-id', post.id);
    button.setAttribute('role', 'post-button');
    button.textContent = btnText;
    item.replaceChildren(anchor, button);
    return item;
  });

  const card = getCard(title, items);
  postsContainer.append(card);
  return postsContainer;
};

export const getFeedsHTML = async (feeds, i18n) => {
  const title = await i18n.t('feeds.feedsTitle');
  const feedsContainer = document.createElement('div');
  feedsContainer.classList.add('col-md-10', 'col-lg-4', 'mx-auto', 'order-0', 'order-lg-1', 'feeds');

  const items = feeds.map((feed) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.desc;
    item.replaceChildren(h3, p);
    return item;
  });

  const card = getCard(title, items);
  feedsContainer.append(card);
  return feedsContainer;
};

export const getModalBGHTML = () => {
  const background = document.createElement('div');
  background.classList.add('modal-backdrop', 'fade', 'show');
  return background;
};
