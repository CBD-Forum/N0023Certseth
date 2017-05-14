Template.eduinfo.events({
    'submit form': function(event,tpl){
		event.preventDefault();
        
         //用户类型
        　//教育机构名称
         
        var username = tpl.$('#name').val();　//邮箱
        var address = tpl.$('#address').val();　//账户密码
       
        
        var call = tpl.$('#call').val();
        
             s1.innerHTML='正在提交审核';
   s1.style.color='red';
         Meteor.users.update(Meteor.userId(),{$set:{'profile.address':address}});
         Meteor.users.update(Meteor.userId(),{$set:{'profile.call':call}});
         Meteor.users.update(Meteor.userId(),{$set:{'profile.username':username}});
         window.setTimeout("window.location='/regsuccess'",2000);
    
	
    }
});
