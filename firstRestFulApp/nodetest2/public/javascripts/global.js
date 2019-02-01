// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
  var userListData;
  // Populate the user table on initial page load
  populateTable();

  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
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