function submissions (): void {
  event.preventDefault();

  var name = ( <HTMLInputElement>document.getElementById( 'name' ) ).value.trim();
  var email = ( <HTMLInputElement>document.getElementById( 'email' ) ).value.trim();
  var phone = ( <HTMLInputElement>document.getElementById( 'phone' ) ).value.trim();
  var birthday = ( <HTMLInputElement>document.getElementById( 'birthday' ) ).value;
  var password = ( <HTMLInputElement>document.getElementById( 'password' ) ).value.trim();
  var cfmPassword = ( <HTMLInputElement>document.getElementById( 'cfmpassword' ) ).value.trim();

  const errName: HTMLElement = document.getElementById( 'invalid_Name' );
  const errEmail: HTMLElement = document.getElementById( 'invalid_Email' );
  const errPhone: HTMLElement = document.getElementById( 'invalid_Phone' );
  const errBirthday: HTMLElement = document.getElementById( 'invalid_Birthday' );
  const errPassword: HTMLElement = document.getElementById( 'invalid_Password' );
  const errCfmPassword: HTMLElement = document.getElementById( 'invalid_Confirm-Password' );
  const success: HTMLElement = document.getElementById( 'success' );

  const dataName: HTMLElement = document.getElementById( 'data_name' );
  const dataEmail: HTMLElement = document.getElementById( 'data_email' );
  const dataPhone: HTMLElement = document.getElementById( 'data_phone' );
  const dataBirthday: HTMLElement = document.getElementById( 'data_birthday' );
  const dataAvatars: HTMLElement = document.getElementById( 'avatars' );
  let checkValidate = true;

  // add data
  checkValidate = addName( name, errName, 'Fullname' );

  checkValidate = addEmail( email, errEmail, 'Email' );

  checkValidate = addPhone( phone, errPhone, 'Phone number' );

  checkValidate = addBirthday( birthday, errBirthday, 'birthday' );

  const addNewPassword = addPassword( password, errPassword );

  const checkCfmPw = checkCfmPassword( password, cfmPassword, errCfmPassword );

  //format data
  name = formatName( name );

  phone = formatPhone( phone );

  birthday = formatBirthday( birthday );

  if ( checkValidate && checkCfmPw ) {
    errName.innerHTML = '';
    errEmail.innerHTML = '';
    errPhone.innerHTML = '';
    errBirthday.innerHTML = '';
    errPassword.innerHTML = '';
    errCfmPassword.innerHTML = '';

    dataName.innerHTML = name;
    dataEmail.innerHTML = email;
    dataPhone.innerHTML = phone;
    dataBirthday.innerHTML = birthday;
    success.style.display = 'block';
    dataAvatars.style.display = 'block';
  }
};

//-------------------------------------------------------------------------------------------------------------
// required function constructure
const isRequired = ( value: any, errMessage: any, typename: string ): boolean => {
  if ( value === '' || value == null ) {
    errMessage.innerHTML = `** Please fill your ${typename} in field !!`;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
};

// Max characters function constructure
const isMax = ( value: any, errMessage: any, max: number ): boolean => {
  if ( value.length >= max ) {
    errMessage.innerHtml = `** please input less than ${max} characters !!`;
    return false;
  }
  errMessage.innerHtml = '';
  return true;
};

//Regex function constructure
const isRegex = ( value: any, errMessage: any, regex: any, errRegex: string ): boolean => {
  if ( !regex.test( value ) ) {
    errMessage.innerHTML = errRegex;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
};

// between lenght characters input function constructure
const isBetween = ( value: any, errMessage: any, min: number, max: number ): boolean => {
  if ( value.length < min || value.length > max ) {
    errMessage.innerHTML = `Characters lenght must be between ${min} and ${max}`;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
};
//------------------------------------------------------------------------------------------------------------
//format phone constructure function
const formatPhone = ( phone: string ): string => {
  phone = phone.replace( /(\d{3})(\d{3})(\d{4})/, '$1-$2-$3' );
  return phone;
};

//format name constructure function
const formatName = ( name: string ): string => {
  const arrName = name.split( ' ' );
  for ( var i = 0; i < arrName.length; i++ ) {
    arrName[i] = arrName[i].charAt( 0 ).toUpperCase() + arrName[i].slice( 1 );
  }
  return arrName.join( ' ' );
};

//format birthday constructure function
const formatBirthday = ( birthday: any ) => {
  var day = new Date( birthday ).getDate();
  var month = new Date( birthday ).getMonth() + 1;
  var year = new Date( birthday ).getFullYear();
  if ( day < 10 ) {
    return ( birthday = `0${day} - ${month} - ${year}` );
  } else if ( month < 10 ) {
    return ( birthday = `${day} - 0${month} - ${year}` );
  } else if ( year < 1930 || year > 2022 ) {
    // errBirthday.innerHTML = 'Please check your ages !!';
    return false;
  }
  birthday = `${day} - ${month} - ${year}`;
  return birthday;
};

//-------------------------------------------------------------------------------------------------------------

//add Name constructure function
const addName = ( name: string, errName: HTMLElement, typename: string ): boolean => {
  const regName =
    /á|à|ạ|ã|ả|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẫ|ẩ|ậ|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ể|ễ|ệ|ì|í|ĩ|ị|ỉ|ò|ó|ỏ|õ|ọ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ|ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ữ|ử|ự|ý|ỳ|ỹ|ỵ|ỷ|đ|^[a-zA-Z]+([a-zA-Z]|\s)+$/;
  let errRegex = '** wrong format input value !!';
  if ( !isRequired( name, errName, typename ) ) {
    return false;
  } else if ( !isMax( name, errName, 50 ) ) {
    return false;
  } else if ( !isRegex( name, errName, regName, errRegex ) ) {
    return false;
  }

  return true;
};

//add Email constructure function
const addEmail = ( email: string, errEmail: HTMLElement, typename: string ): boolean => {
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let errRegex = '** Invalid email format (ex: nguyentuankiet0105@gmail.com ) !!';

  if ( !isRequired( email, errEmail, typename ) ) {
    return false;
  } else if ( !isRegex( email, errEmail, regEmail, errRegex ) ) {
    return false;
  }

  return true;
};

//add Phone constructure function
const addPhone = ( phone: string | number, errPhone: HTMLElement, typename: string ): boolean => {
  const regPhone = /((0)+([0-9]{9})\b)/g;
  let errRegex = '** Begin at 0, at least 10 number ( ex: 0123456789 )!!';
  if ( !isRequired( phone, errPhone, typename ) ) {
    return false;
  } else if ( !isRegex( phone, errPhone, regPhone, errRegex ) ) {
    return false;
  }

  return true;
};

//add Birthday constructure function
const addBirthday = ( birthday: string, errBirthday: HTMLElement, typename: string ): boolean => {
  if ( !isRequired( birthday, errBirthday, typename ) ) {
    return false;
  }
  return true;
};

//add Password constructure function
const addPassword = ( password: string, errPassword: HTMLElement ): boolean => {
  const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const errorRegex = 'Password has at least one special character, number and uppercase letter';
  if ( isRegex( password, errPassword, regPassword, errorRegex ) ) {
    return false;
  }

  return true;
};

//function load image -------------------------------------------------

const reader = new FileReader();

const uploadImg = () => {
  const avatar: any = document.getElementById( 'avatar' );
  const avatars: any = document.getElementById( 'avatars' );
  const imgLoad = ( <HTMLInputElement>document.getElementById( 'file' ) ).files[0];
  reader.addEventListener(
    'load',
    function () {
      // convert image file to base64 string
      avatar.src = reader.result;
      avatars.src = reader.result;
    },
    false
  );
  reader.readAsDataURL( imgLoad );
};

const checkCfmPassword = ( password: string, cfmPassword: string, errCfmPassword: HTMLElement ): boolean => {
  if ( password !== cfmPassword ) {
    errCfmPassword.innerHTML = `cfmPassword and password not match `;
    return false;
  }

  return true;
};
//----------------------------------------------------------------------
//Reset function
const resetForm = () => {
  location.reload();
};

// function keyup
document.onkeyup = function ( event ) {
  if ( event.key == 'Shift' ) {
    submissions();
  }
  if ( event.key == 'Delete' ) {
    resetForm();
  }
};
