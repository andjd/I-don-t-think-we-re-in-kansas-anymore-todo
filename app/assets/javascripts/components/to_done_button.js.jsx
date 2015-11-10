(function(root){
  "use strict";

  var ToDo = root.ToDo = (root.ToDo || {});

    ToDo.ToDone =  React.createClass ({
      buttonText: function () {
        var text = (this.props.el.done) ? 'finished' : 'finish';
        return text;
      },

      render: function () {
        return(
          <button onClick={this.props.toggle}>{this.buttonText()}</button>
        );
      }


    });

}(this));
