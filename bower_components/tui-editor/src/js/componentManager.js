/**
 * @fileoverview Implements CommandManager
 * @author Junghwan Park(junghwan.parkm@nhnent.com) FE Development Lab/NHN Ent.
 */

/**
 * ComponentManager
 * @exports CommandManager
 * @class
 */
class ComponentManager {
    /**
     * Constructor
     * @param {MarkdownEditor|WysiwygEditor} editor Editor instance
     */
    constructor(editor) {
        /**
         * private
         * @type {object}
         * @private
         */
        this._managers = {};
        this._editor = editor;
    }

    /**
     * addManager
     * Add manager
     * @api
     * @memberOf CommandManager
     * @param {string|function} nameOrConstructor Manager name or constructor
     * @param {function} [ManagerConstructor] Constructor
     */
    addManager(nameOrConstructor, ManagerConstructor) {
        if (!ManagerConstructor) {
            ManagerConstructor = nameOrConstructor;
            nameOrConstructor = null;
        }

        const instance = new ManagerConstructor(this._editor);

        this._managers[nameOrConstructor || instance.name] = instance;
    }

    /**
     * getManager
     * Get manager by manager name
     * @api
     * @memberOf CommandManager
     * @param {string} name Manager name
     * @returns {object} manager
     */
    getManager(name) {
        return this._managers[name];
    }

    /**
     * Remove Manager.
     * @param {string} name - manager name
     */
    removeManager(name) {
        const manager = this.getManager(name);

        if (!manager) {
            return;
        }

        if (manager.destroy) {
            manager.destroy();
        }

        delete this._managers[name];
    }

}

module.exports = ComponentManager;