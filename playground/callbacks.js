var getUser = (id, callback) => {
  var user = {
  	id: id,
  	name: 'Vick'
  };
  
  setTimeout(()=>{
	  callback(user);
  }, 2500);

};

getUser(31, (user)=>{
  console.log(user);
});