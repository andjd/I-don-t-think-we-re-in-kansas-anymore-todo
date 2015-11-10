(function(root){
  "use strict";

  var ToDo = root.ToDo = (root.ToDo || {});


  ToDo.ToDoList = React.createClass( {
    getInitialState: function(){
      return {toDos: ToDo.ToDoStore.all()};
    },

    toDosChanged: function () {
      this.setState({toDos: ToDo.ToDoStore.all()});
    },

    destroyPreHandler: function (el) {
      return (function (event) {
        event.preventDefault();
        ToDo.ToDoStore.destroy(el);
      });
    },

    togglePreDone: function (el) {
      return(function (event) {
        event.preventDefault();
        ToDo.ToDoStore.toggleDone(el);
      });
    },

    componentDidMount: function (){

      ToDo.ToDoStore.addHandler(this.toDosChanged);
      ToDo.ToDoStore.fetch();
    },

    componentWillUnmount: function (){
      ToDo.ToDoStore.removeHandler(this.toDosChanged);
    },

    render: function(){
      return (
        <nav>
          {this.state.toDos.map(function (el) {
            return <ToDo.ToDoItem key={el.id}
                    item={el}
                    submit={this.destroyPreHandler(el)}
                    toggle={this.togglePreDone(el)}
                  />;
          }.bind(this))}
          <ToDo.NewToDo />
        </nav>
      );
    }
  });

  ToDo.ToDoItem = React.createClass( {
      getInitialState: function (){
        return {display: false};
      },

      toggleDisplay: function() {
        var newState = !(this.state.display);
        this.setState({display: newState});
      },

    render: function(){

      return(<li onClick={this.toggleDisplay}>
              <h4>
                {this.props.item.title}
              </h4>
              <ToDo.ToDone toggle={this.props.toggle} el={this.props.item} />
              <ToDo.ToDoDetail
                    el={this.props.item}
                    display={this.state.display}
                    submit={this.props.submit}
                  />
            </li>
          );
    }

  });

  ToDo.ToDoDetail = React.createClass({
    render: function(){
      if (this.props.display) {
        return(
            <div>
              <article>
                {this.props.el.body}
              </article>
              <button onClick={this.props.submit} >Nope!</button>
            </div>
          );
        } else {return <div />;}
      }
  });

})(this);
