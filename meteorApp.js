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
      var sig = '[{"lx":93,"ly":32,"mx":93,"my":31},{"lx":93,"ly":32,"mx":93,"my":32},{"lx":88,"ly":31,"mx":93,"my":32},{"lx":78,"ly":35,"mx":88,"my":31},{"lx":62,"ly":39,"mx":78,"my":35},{"lx":51,"ly":39,"mx":62,"my":39},{"lx":44,"ly":39,"mx":51,"my":39},{"lx":37,"ly":39,"mx":44,"my":39},{"lx":31,"ly":39,"mx":37,"my":39},{"lx":31,"ly":33,"mx":31,"my":39},{"lx":37,"ly":23,"mx":31,"my":33},{"lx":49,"ly":15,"mx":37,"my":23},{"lx":59,"ly":12,"mx":49,"my":15},{"lx":78,"ly":9,"mx":59,"my":12},{"lx":86,"ly":9,"mx":78,"my":9},{"lx":92,"ly":10,"mx":86,"my":9},{"lx":95,"ly":11,"mx":92,"my":10},{"lx":95,"ly":13,"mx":95,"my":11},{"lx":95,"ly":14,"mx":95,"my":13},{"lx":96,"ly":14,"mx":95,"my":14},{"lx":97,"ly":14,"mx":96,"my":14}]';
      $('.sigPad').signaturePad({displayOnly:true}).regenerate(sig);
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
