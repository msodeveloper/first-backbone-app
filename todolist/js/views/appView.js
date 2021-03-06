var app = app || {};

(function() {
    'use strict';

    app.AppView = Backbone.View.extend({
        el: '#todo-app',

        initialize: function() {
            this.$input = this.$el.find('#new-todo');
            this.$list = this.$el.find('#list-todo');

            app.todos.on('add', this.renderTodos, this);
            app.todos.on('remove', this.renderTodos, this);
            app.todos.on('change', this.renderTodos, this);
        },

        events: {
            'keypress #new-todo': 'addTodo'
        },

        addTodo: function(e) {
            if(e.which === ENTER_KEY) {
                app.todos.add({
                    title: this.$input.val()
                }, {validate: true});

                this.$input.val('');
            }
        },

        renderTodos: function() {
            this.$list.html('');

            _.each(app.todos.models, function(todo) {
                var todoHtml = new app.TodoView({
                    model: todo
                });

                this.$list.append(todoHtml.el);
            }, this);
        }
    });
} ());