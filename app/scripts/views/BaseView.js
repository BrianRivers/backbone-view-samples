App.Views = App.Views || {};

(function () {
    'use strict';
    App.Views.Base = Backbone.View.extend({
        // overridden Backbone functions
        initialize: function (options) {
            this.options = _.defaults(options || {}, this.options);
            this.el = this.options.el || this.el;
            this._container = new Backbone.ChildViewContainer();
            this.init();
        },
        render: function () {
            this.$el.html(this.template(this.options));
            return this;
        },
        remove: function () {
            this.removeSubviews();
            this.destroy();
            this.$el.remove();
            this.stopListening();
            return this;
        },
        // custom entry points and utilities
        init: function () {
            // stub to do additional setup tasks
        },
        destroy: function () {
            // stub to do addtional removal tasks
        },
        addSubview: function (view) {
            this._container.add(view);
        },
        addSubviews: function (views) {
            _.each(views, function (view) {
                this._container.add(view);
            }, this);
        },
        removeSubview: function (view, model) {
            if (!view) {
                view = this._container.findByModel(model);
            }
            this._container.remove(view);
            view.remove();
        },
        removeSubviews: function () {
            this._container.each(function (view) {
                this.removeSubview(view);
            }, this);
            return this;
        }
    });
})();
