if (Meteor.isClient) {

  //Templates
  Template.info.helpers({

  });


  Template.ppe.helpers({

  });

  Template.signature.helpers({

  });

  //Template Events
  Template.signature.events({ 'submit form': function(e) {
    e.preventDefault();
    var sig = $(e.target).find('[name=output]').val();

    console.log("hi" + sig);
  }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
