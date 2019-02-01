// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
  var userListData;
  // Populate the user table on initial page load
  populateTable();

  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

  $('#btnAddUser').on('click', addUser);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/users/userlist', function( data ) {

    userListData = data;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    console.log(tableContent);
    $('#userList table tbody').html(tableContent);
  });
};

function showUserInfo(event){
    event.preventDefault();
    var userName = $(this).attr('rel');  
    var userArrayIndex = userListData.map(function(arrayItem){ return arrayItem.username;}).indexOf(userName);

    console.log('+++',userListData);

    var currentUserObjects = userListData[userArrayIndex];

    console.log('-----',currentUserObjects);

    $('#userInfoName').text(currentUserObjects.fullname);
    $('#userInfoAge').text(currentUserObjects.age);
    $('#userInfoGender').text(currentUserObjects.gender);
    $('#userInfoLocation').text(currentUserObjects.location);
  };

  function addUser(event){
    event.preventDefault();

    var errcount = 0;
    $('#addUser input').each(function(index, val){
      if($(this).val === ''){
        errcount ++;
      }
    });
    if(errcount === 0){
      var newUser = {
        'username': $('#addUser fieldset input#inputUserName').val(),
        'email': $('#addUser fieldset input#inputUserEmail').val(),
        'fullname': $('#addUser fieldset input#inputUserFullname').val(),
        'age': $('#addUser fieldset input#userAge').val(),
        'location': $('#addUser fieldset input#userLocation').val(),
        'gender': $('#addUser fieldset input#userGender').val(),
      }
      $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/addUser',
        dataType: 'JSON' 
      }).done(function(res){
        if(res.msg === ''){
          $('#addUser fieldset input').val('');
          populateTable();        
        }
        else{
          alert('Error: ', res.msg);
        }
      });
    }
    else{
      alert('all inputs required to be filled');

    }
  };