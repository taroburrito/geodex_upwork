export function addPost(formData){
  return (dispatch) => {
    $.ajax({
      type:'POST',
      url:'/api/v1/posts/addPost',
      dataType:'JSON',
      data:formData
    }).done(function(data){
      if(data.error){
        console.log(data.error);
      }else{
      console.log("Successfully created post:"+JSON.stringify(data));


      }

    }).error(function(error){
      console.log("Error in posts api call"+JSON.stringify(error));
    })
  }
}
