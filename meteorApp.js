Jsaform = new Mongo.Collection("jsaform");

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

    var client1 = $(e.target).find('[name=client]').val();

    console.log(client1);
    console.log(sig);

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


    // Jsaform.insert({
    //   createdAt: new Date(),
    //   sig: sig,
    //   user: Meteor.userId(),
    //
    //
    //   safetyGlasses: safetyGlasses,
    //   hearingProtection: hearingProtection,
    //   faceShield: faceShield,
    //   fallProtection: fallProtection,
    //   gasMonitor: gasMonitor,
    //   chemicalGloves: chemicalGloves,
    //   hardHat: hardHat,
    //   frClothing: frClothing,
    //   safetyToedboots: safetyToedboots,
    //   elevatedWork: elevatedWork,
    //   leatherGloves: leatherGloves,
    //   rubberGloves: rubberGloves
    //
    // });

    alert("successful");
  }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
