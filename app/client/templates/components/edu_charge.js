Template.charge.helpers({
	islogin:function(){
		return Meteor.userId();
	},
	user:function(){
		return{
			id:Meteor.user()._id,
			username:Meteor.users.findOne(Meteor.userId()).profile.username,
			email:Meteor.user().emails[0].address
		};
	}
	
});

Template.charge.events({





	  'click .logout': function(event){
         event.preventDefault();
         Meteor.logout(function(error) {
            if(error) {
               console.log("ERROR: " + error.reason);
            }
         });
        Router.go('/');
      },

	
	
	'click .quedgm': function(event){
         event.preventDefault();
        
        Router.go('build1');
      }
	
	
    
  
});