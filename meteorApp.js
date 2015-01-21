//var fs = Npm.require('fs');
Jsaform = new Mongo.Collection("jsaform");

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

  //Meteor.subscribe("allUserForms");

   // var doc2 = new jsPDF('p', 'in', 'letter'),
   // fonts = [['Times', 'Roman']],
   // margin = 0.5,
   // verticalOffset = 1;

   // doc2.setFontSize(14);

   // doc2.text(margin, verticalOffset, "JSA INDIVIDUAL REPORT");
   // doc2.text(margin, verticalOffset, "SECOND LINE OF TEXT");
   // doc2.text(margin, verticalOffset, "THIRD LINE OF TEXT");

   // doc2.save("REPORT.pdf");


  // Set up hide and show for templates inside body helpers
  Template.body.helpers({
    show: function(){
      var adminUser = "admin@g.com";
      if (Meteor.user().emails[0].address === adminUser) {
          console.log("adminUser is current user");
          $('.signature').hide();
        $('.admin-dashboard').show();
      } else {
          console.log("adminUser is NOT current user");
        $('.signature').show();
        $('.admin-dashboard').hide();
      }
    },

    svgSig: function(){

      var signatureString = Jsaform.findOne().sig;

      // Meteor's version of JSON
      var signature = EJSON.parse(signatureString);

      var sigLength = signature.length;

      var svgPath = [];
      for (var i=0; i<sigLength; i++) {

        var mpath = "M " + signature[i].mx + "," + signature[i].my + " ";
        var lpath = "L " + signature[i].lx + "," + signature[i].ly + " ";

        svgPath.push(mpath);
        svgPath.push(lpath);

      }
      var formattedPath = svgPath.join("");
      console.log(formattedPath);
      return formattedPath;
    }

  });

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
    },

    userEmail: function() {
      var forms = Jsaforms.find().fetch();
      var user = forms.user;

      for (var i = 0; i < forms.length; i++) {
        var a = Meteor.users.find({_id:user}).fetch();
        return a[0].emails[0].address;
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

    var job = $(e.target).find('[name=job]').val();
    var supervisor = $(e.target).find('[name=supervisor]').val();
    var area = $(e.target).find('[name=area]').val();
    var date = $(e.target).find('[name=date]').val();
    var time = $(e.target).find('[name=time]').val();
    var permit = $(e.target).find('[name=permit]').val();


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

    var sequence = $(e.target).find('[name=sequence]').val();
    var potHazard = $(e.target).find('[name=pot-hazard]').val();
    var procedure = $(e.target).find('[name=procedure]').val();
    var otherPermit = $(e.target).find('[name=other-permit]').val();
    var welding = $(e.target).find('[name=welding]').val();
    var hazard = $(e.target).find('[name=hazard]').val();
    var access = $(e.target).find('[name=access]').val();

    Jsaform.insert({
      createdAt: new Date(),
      sig: sig,
      user: Meteor.userId(),

      client: client,
      project: project,
      location: location,

      job: job,
      supervisor: supervisor,
      area: area,
      date: date,
      time: time,
      permit: permit,

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
      rubberGloves: rubberGloves,

      sequence: sequence,
      potHazard: potHazard,
      procedure: procedure,
      otherPermit: otherPermit,
      welding: welding,
      hazard: hazard,
      access: access


    });


    alert("successful");
  }

  });

}

if (Meteor.isServer) {

  //Meteor.publish("allUserForms", function() {
  //  return Jsaform.find();
  //});

  Meteor.startup(function () {
    // code to run on server at startup

  });
}

//Template.pdf.events({'click #user-form': function(e){
//    e.preventDefault();
//    Jsaform.findOne(this._id).user
//}
//});

var doc = new PDFDocument({size: 'letter'});

//doc.text('ADMINISTRATOR JSA REPORT',{align: 'center'});

//// render initial job info
//doc.text('Client: ' + items.client);
//doc.text('Location: ' + items.location);
//doc.text('Project: ' + items.project);

//// render all checkbox items
//doc.text('Safety Glasses: ' + items.safetyGlasses);
//doc.text('Hearing Protection: ' + items.hearingProtection);
//doc.text('Face Shield: ' + items.faceShield);
//doc.text('Fall Protection: ' + items.fallProtection);
//doc.text('Gas Monitor: ' + items.gasMonitor);
//doc.text('Chemical Gloves: ' + items.chemicalGloves);
//doc.text('Hard Hat: ' + items.hardHat);

//doc.path(formattedPath).stroke();

//doc.text(items.sig);
//doc.writeSync(process.env.PWD + '/TEST.pdf');
