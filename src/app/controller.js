class Controller {
    init(view, state) {
        this.view = view;
        this.view.addRSSInput.addEventListener('input', (event) => {
            state.addRSSForm.value = event.target.value;
        });
        this.view.addRSSForm.addEventListener('submit', (event) => {
            event.preventDefault();
            state.addRSSForm.status = 'submitted';
        })
    }
}

export default Controller;
