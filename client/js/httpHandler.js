(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  /*
  // video functionality.//setting it to window to access outside iife for testing purposes.
  // test on console.  remove & replace window, w/const
  window.fetchCommand () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (command) => {
        // console.log(command);
        SwimTeam.move(command);
      },
      //to not overload calls
      complete: () => {
        setTimeout(fetchCommand, 10)
      }
    });
  }
  // setTimeout(fetchCommand, 0)
  setInterval(fetchCommand, 200);
*/

  const ajaxCommandRequest = () =>{
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        console.log(data);
        SwimTeam.move(data);
        setTimeout(ajaxCommandRequest, 2000);
      },
      error: () => {console.log("fail");}
    });
  }
  ajaxCommandRequest();


  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

}());