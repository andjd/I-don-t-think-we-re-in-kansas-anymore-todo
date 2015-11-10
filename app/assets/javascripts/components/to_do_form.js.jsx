(function(root){
  "use strict";

  var ToDo = root.ToDo = (root.ToDo || {});

  ToDo.NewToDo = React.createClass({
    getInitialState: function(){
      return {titleText: "New ToDo", contentText: "Make Great Things Happen"};
    },

    titleHandler: function(event) {
      this.setState({titleText: event.currentTarget.value});
    },

    contentHandler: function(event) {
      this.setState({contentText: event.currentTarget.value});
    },

    submitHandler: function (event) {
      event.preventDefault();
      ToDo.ToDoStore.create({title: this.state.titleText, body: this.state.contentText});
    },

    clearTitle: function (context) {
        this.setState({ titleText: ""});
    },

    clearContent: function (context) {
        this.setState({ contentText: ""});
    },


    render: function(e){
      return(
              <form onSubmit={this.submitHandler}>
              <label>ToDo Title<br />
                <input type="text" onFocus={this.clearTitle} onChange={this.titleHandler} value={this.state.titleText} />
              </label><br />
              <label>ToDo Content<br />
                <textarea onFocus={this.clearContent} onChange={this.contentHandler} value={this.state.contentText} />
              </label><br />
              <button>Make ToDo</button>
              </form>
      ) ;
    }
  });

}(this));
