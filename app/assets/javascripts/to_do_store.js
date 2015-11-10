(function(root){
  "use strict";
  var ToDo = root.ToDo = (root.ToDo || {});
  var ToDoStore = ToDo.ToDoStore = {};

  var _to_dos = [];
  var _callbacks = [];

  ToDoStore.changed = function() {
    _callbacks.forEach(function (cb) {
      cb.call();
    });
  };

  ToDoStore.addHandler = function (proc) {
    _callbacks.push(proc);
  };

  ToDoStore.removeHandler = function (proc) {
    _callbacks = _callbacks.filter(function (cb) {
      return (cb !== proc);
    });
  };

  ToDoStore.fetch = function () {
    $.ajax("/api/to_dos", {
      type: "get",
      dataType: 'json',
      success: function (data) {
        _to_dos = data;
        ToDoStore.changed();
      },
      error: ToDoStore.errorCallback
    });

  };
  ToDoStore.all = function () {
    return _to_dos;
  };

  ToDoStore.create = function (el) {
    $.ajax("/api/to_dos", {
      type: "post",
      dataType: 'json',
      data: { to_do: el },
      success: function (data) {
        _to_dos.push(data);
        ToDoStore.changed();
      },
      error: ToDoStore.errorCallback
    });
  };

  ToDoStore.errorCallback = function (data) {
    _to_dos = ['👿'];
  };



  ToDoStore.destroy =  function (el) {
    var idx = _to_dos.indexOf(el);
    if (idx === -1) {
      return;
    } else {
      $.ajax("/api/to_dos/" + el.id, {
        type: "delete",
        dataType: 'json',
        success: function (data) {
          _to_dos.splice(idx, 1);
          ToDoStore.changed();
        },
        error: ToDoStore.errorCallback
      });
    }
  };

  ToDoStore.toggleDone =  function (el) {
    var idx = _to_dos.indexOf(el);
    if (idx === -1) {
      return;
    } else {
      $.ajax("/api/to_dos/" + el.id, {
        type: "patch",
        dataType: 'json',
        data: { to_do: {done: (!(el.done))} },
        success: function (data) {
          _to_dos[idx].done = !(el.done);
          ToDoStore.changed();
        },
        error: ToDoStore.errorCallback
      });
    }
  };
}(this));
