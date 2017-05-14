Template.eduperson.helpers({
	islogin:function(){
		return Meteor.userId();
	},
	user:function(){
		return{
			id:Meteor.user()._id,
			username:Meteor.users.findOne(Meteor.userId()).profile.username,
			email:Meteor.user().emails[0].address,
			
            call:Meteor.users.findOne(Meteor.userId()).profile.call,
            address:Meteor.users.findOne(Meteor.userId()).profile.address,
            ethaddress:Meteor.users.findOne(Meteor.userId()).profile.ethAddress,
		};
	}
	
});
Template.eduperson.events({
	  'click .logout': function(event){
         event.preventDefault();
         Meteor.logout(function(error) {
            if(error) {
               console.log("ERROR: " + error.reason);
            }
         });
        Router.go('/');
      }
});