import Controller from "./controller";

export const ADD_RSS_FORM_ID = 'url-form';
export const ADD_RSS_INPUT_ID = 'url-input';
export const ADD_RSS_MESSAGE_ID = 'url-message';

class View {
    init(state) {
        this.controller = new Controller();
        this.addRSSForm = document.getElementById(ADD_RSS_FORM_ID);
        this.addRSSInput = document.getElementById(ADD_RSS_INPUT_ID);
        this.addRSSMessage = document.getElementById(ADD_RSS_MESSAGE_ID);

        this.addRSSInput.focus();

        this.controller.init(this, state);
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
}

export default View;
