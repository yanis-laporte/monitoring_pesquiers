import '../scss/toast.scss';

/**
 * Class that handles the toast notifications.
 */
class Toast {
    /**
     * Create a new toast
     * @class
     * @param {HTMLElement} container - The container where the toast will be displayed
     */
    constructor(container) {
        console.log("Toast constructor...", container);

        this.element = container;
        this.toastsCount = 0;
    }

    /**
     * 
     * @param {String} [title=type] - The title of the toast (default: equal to type)
     * @param {String} message - The message to be displayed
     * @param {String} [type=info] -  Type of the toast
     * @param {Object[]} [options] - Options of the toast
     * @param {Boolean} [options.animation=true] - If true, the toast will be animated
     * @param {Boolean} [options.autohide=true] - If true, the toast will be automatically removed after a delay
     * @param {Number} [options.delay=2500] - Delay before the toast is removed (only if autohide is true)
     */
    show(title, message, type, options) {
        this.title = title || { 'success': 'Succès', 'info': 'Information', 'warning': 'Attention', 'danger': 'Erreur' }.type
        this.message = message

        this.options = {
            animation: true,
            autohide: true,
            delay: 2500,
        }

        // Combine les 2 objets options
        Object.assign(this.options, options)

        this.type = ['success', 'info', 'warning', 'danger'].indexOf(type) > -1 ? type : 'info';

        console.debug("Showing toast...", { title, message, type, ...this.options });

        var el = document.createElement('div')

        this.options.animation ? el.className += 'toast-item-animation' : el.className = 'toast-item'
        el.className += ` toast-${this.type}`;
        el.innerHTML = `
            <div class="toast-title">${title} ${!this.options.autohide ? '<span class="toast-mark"></span>' : ''}</div>
            <div class="toast-body">${message}</div>
        `
        el.setAttribute('id', 'toast' + this.toastsCount)
        var child = this.element.appendChild(el);

        this.toastsCount += 1;

        // Autohide toast
        if (this.options.autohide) {
            setTimeout(() => {
                console.debug("Toast removed:", this);
                this.remove(child)
            }, this.options.delay)
        } else {
            // Add mark to close the toast
            child.querySelector('.toast-mark').addEventListener('click', () => {
                this.remove(child)
            });
        }
    }

    remove(child) {
        if (this.options.animation) {
            child.className += ' toast-animation-out'
            // Fired when animation end
            child.addEventListener('animationend', () => {
                child.remove();
            });
        } else {
            child.remove();
        }
    }
}

console.info('New Toast initialized');

module.exports = {
    Toast
}