// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
    var filters = {
  all: function(todos) {
    return todos;
  },
  complete: function(todos) {
    return todos.filter(function(todo) {
      return todo.complete;
    });
  },
  incomplete: function(todos) {
    return todos.filter(function(todo) {
      return !todo.complete;
    });
  }
}

var STORAGE_KEY = 'vue-js-todo-P7oZi9sL'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}

var app = new Vue({
  el: '#app',
  data: {
    inputVal: '',
    todos: todoStorage.fetch(),
    visibility: 'all'
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      }
    }
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    }
  },
  methods: {
    addTodo: function(e) {
      e.preventDefault();
      if (this.inputVal) {
        this.todos.push({
          text: this.inputVal,
          complete: false
        });
      }
      this.inputVal = '';
    },
    toggleTodo: function(todo) {
      todo.complete = !todo.complete;
    },
    filterTodos: function(filter) {
      this.visibility = filter;
    },
    deleteTodo: function(index) {
      this.todos.splice(index, 1);
    }
  }
});
(function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();
