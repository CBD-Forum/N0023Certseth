// JavaScript 

Router.configure({
  
 
  notFoundTemplate: 'notFound',

});
Router.route('/band1',{name:'band1'});
Router.route('/certmany',{name:'certmany'});
Router.route('/charge',{name:'charge'});
Router.route('/contact',{name:'contact'});
Router.route('/contact1',{name:'contact1'});
Router.route('/contact2',{name:'contact2'});
Router.route('/contact3',{name:'contact3'});
Router.route('/download',{name:'download'});
//Router.route('/edu',{name:'edu'});
Router.route('/edu',function(){
    this.render('edu');
});
Router.route("/edu/:_id",function(){
userinfo=Users.findOne({_id:this.params._id});
this.render('edu',{
    data:function(){
        return userinfo;
    }``
});
});
Router.route('/edubuy',{name:'edubuy'});
Router.route('/eduid',{name:'eduid'});


Router.route('/eduperson',{name:'eduperson'});
Router.route('/edurest',{name:'edurest'});
Router.route('/ethreg',{name:'ethreg'});
Router.route('/regsuccess',{name:'regsuccess'});
Router.route('/stu',{name:'stu'});
Router.route('/',{name:'zhuye'});
Router.route('/zhuye1',{name:'zhuye1'});
Router.route('/regmail',{name:'regmail'});
Router.route('/regtel',{name:'regtel'});
Router.route('/logintel',{name:'logintel'});
Router.route('/loginmail',{name:'loginmail'});
Router.route('/certone',{name:'certone'});
//Router.route('/searchone',{name:'searchone'});
Router.route('/searchmany',{name:'searchmany'});
Router.route('/eduinfo',{name:'eduinfo'});
Router.route('/build',{name:'build'});
Router.route('/build1',{name:'build1'});
Router.route('/eduless',{name:'eduless'});
