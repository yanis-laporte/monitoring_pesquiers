/**
 * Class qui gère les notifications sous forme de toast.
 */
export class Toast {
    /**
     * Constructeur
     * @class
     * @param {HTMLElement} container - Le container ou les toasts seront placé
     */
    constructor(container) {
        console.debug("Toast constructor...", container);

        this.element = container;
        this.toastsCount = 0;
    }

    /**
     * 
     * @param {String} [title=type] - Titre (default: égale à type)
     * @param {String} message - Message/ body du toast
     * @param {String} [type=info] -  Type du toast (info, success, warning, error)
     * @param {Object[]} [options] - Options du toast
     * @param {Boolean} [options.animation=true] - Si true, le toast sera animé
     * @param {Boolean} [options.autohide=true] - Si true, le toast sera automatiquement supprimé après un certain temps
     * @param {Number} [options.delay=2500] - Délais en ms avant la suppression du toast
     */
    show(title, message, type, options) {
        this.title = title || { 'success': 'Succès', 'info': 'Information', 'warning': 'Attention', 'danger': 'Erreur' }.type
        this.message = message

        this.options = {
            animation: true,
            autohide: true,
            delay: 3000,
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
            // Supprimer le toast lorsque l'utilisateur clique sur la croix
            child.querySelector('.toast-mark').addEventListener('click', () => {
                this.remove(child)
            });
        }
    }

    /**
     * Supprimer le toast associé a l'element child
     * @param {HTMLElement} child
     */
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

    /**
     * Supprimer tout les toasts
     */
    removeAll() {
        this.element.childNodes.forEach(child => {
            this.remove(child);
        });
    }
}