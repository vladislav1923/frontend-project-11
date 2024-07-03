class Controller {
  init (view) {
    this.view = view;
  }

  setAddRSSFormHandlers (state) {
    this.view.addRSSInput.addEventListener('input', (event) => {
      state.addRSSForm.value = event.target.value;
    });
    this.view.addRSSForm.addEventListener('submit', (event) => {
      event.preventDefault();
      state.addRSSForm.status = 'submitted';
    });
  }

  setPostsHandlers (state) {
    this.view.feedsSection.addEventListener('click', (event) => {
      if (event.target.role === 'post-button') {
        state.readPostsIds = [...state.readPostsIds, event.target.dataset.postId];
        state.modal.open = true;
        state.modal.postId = event.target.dataset.postId;
      }
      if (event.target.role === 'post-anchor') {
        state.readPostsIds = [...state.readPostsIds, event.target.id];
      }
    });
  }

  setModalHandlers (state) {
    this.view.modal.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        state.modal.open = false;
        state.modal.postId = null;
      }
    });
  }
}

export default Controller;
