Template.zhuye.events({
	  'click .wap_nav': function(event){
         
       $("#menu").slideToggle();
      },
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
Template.zhuye.helpers({
	islogin:function(){
		return Meteor.userId();
	},
	user:function(){
		return{
			username:Meteor.users.findOne(Meteor.userId()).profile.username,
			email:Meteor.user().emails[0].address,
            call:Meteor.users.findOne(Meteor.userId()).profile.call,
            address:Meteor.users.findOne(Meteor.userId()).profile.address,
            ethaddress:Meteor.users.findOne(Meteor.userId()).profile.ethAddress,
		};
	}
	
});