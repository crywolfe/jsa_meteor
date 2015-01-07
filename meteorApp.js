Jsaform = new Mongo.Collection("jsaform");

// Set up a Test Admin account
// Meteor.users.update({"emails.address": "admin@g.com"}, {$set: {admin: true}});

// Set up a Test Admin account. Still need to figure out how to use onCreateUser method. But this is a good temporary alternative.
if (Meteor.users.find({"emails.address": "admin@g.com"}).count() === 0) {
  Accounts.createUser({
    admin: true,
    email: 'admin@g.com',
    password: '123456'
  });
}

if (Meteor.isClient) {

  //Templates

  Meteor.subscribe("allUserForms");

  Template.adminDashboard.helpers({

    allUserForms: function() {
      return Jsaform.find({}, {sort: {createdAt: -1}});
    },

    generate: function() {

        var forms = Jsaform.find().fetch();

        for(var i = 0; i < forms.length; i++) {
            var api = $('#' + forms[i]._id).signaturePad({displayOnly:true});
            api.regenerate(forms[i].sig);
        }
    }

  });

  Template.signature.helpers({

  });

  //Template Events
  Template.signature.events({ 'submit form': function(e) {
    e.preventDefault();
    var sig = $(e.target).find('[name=output]').val();

    var client = $(e.target).find('[name=client]').val();
    var project = $(e.target).find('[name=project]').val();
    var location = $(e.target).find('[name=location]').val();

    // console.log(client);
    // console.log(sig);

    var safetyGlasses = $('#safety-glasses').is(':checked');
    var hearingProtection = $('#hearing-protection').is(':checked');
    var faceShield = $('#face-shield').is(':checked');
    var fallProtection = $('#fall-protection').is(':checked');
    var gasMonitor = $('#gas-monitor').is(':checked');
    var chemicalGloves = $('#chemical-gloves').is(':checked');
    var hardHat = $('#hard-hat').is(':checked');
    var frClothing = $('#fr-clothing').is(':checked');
    var safetyToedboots = $('#safety-toed-boots').is(':checked');
    var elevatedWork = $('#elevated-work').is(':checked');
    var leatherGloves = $('#leather-gloves').is(':checked');
    var rubberGloves = $('#rubber-gloves').is(':checked');


    Jsaform.insert({
      createdAt: new Date(),
      sig: sig,
      user: Meteor.userId(),

      client: client,
      project: project,
      location: location,

      safetyGlasses: safetyGlasses,
      hearingProtection: hearingProtection,
      faceShield: faceShield,
      fallProtection: fallProtection,
      gasMonitor: gasMonitor,
      chemicalGloves: chemicalGloves,
      hardHat: hardHat,
      frClothing: frClothing,
      safetyToedboots: safetyToedboots,
      elevatedWork: elevatedWork,
      leatherGloves: leatherGloves,
      rubberGloves: rubberGloves

    });


    alert("successful");
  }

  });

}

if (Meteor.isServer) {

  Meteor.publish("allUserForms", function() {
    return Jsaform.find();
  });

  Meteor.startup(function () {
    // code to run on server at startup

  });
}
