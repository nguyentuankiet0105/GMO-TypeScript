function submissions() {
    event.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var birthday = document.getElementById('birthday').value;
    var password = document.getElementById('password').value.trim();
    var cfmPassword = document.getElementById('cfmpassword').value.trim();
    var errName = document.getElementById('invalid_Name');
    var errEmail = document.getElementById('invalid_Email');
    var errPhone = document.getElementById('invalid_Phone');
    var errBirthday = document.getElementById('invalid_Birthday');
    var errPassword = document.getElementById('invalid_Password');
    var errCfmPassword = document.getElementById('invalid_Confirm-Password');
    var success = document.getElementById('success');
    var dataName = document.getElementById('data_name');
    var dataEmail = document.getElementById('data_email');
    var dataPhone = document.getElementById('data_phone');
    var dataBirthday = document.getElementById('data_birthday');
    var dataAvatars = document.getElementById('avatars');
    var checkValidate = true;
    // add data
    checkValidate = addName(name, errName, 'Fullname');
    checkValidate = addEmail(email, errEmail, 'Email');
    checkValidate = addPhone(phone, errPhone, 'Phone number');
    checkValidate = addBirthday(birthday, errBirthday, 'birthday');
    var addNewPassword = addPassword(password, errPassword);
    var checkCfmPw = checkCfmPassword(password, cfmPassword, errCfmPassword);
    //format data
    name = formatName(name);
    phone = formatPhone(phone);
    birthday = formatBirthday(birthday);
    if (checkValidate && checkCfmPw) {
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
}
;
//-------------------------------------------------------------------------------------------------------------
// required function constructure
var isRequired = function (value, errMessage, typename) {
    if (value === '' || value == null) {
        errMessage.innerHTML = "** Please fill your ".concat(typename, " in field !!");
        return false;
    }
    errMessage.innerHTML = '';
    return true;
};
// Max characters function constructure
var isMax = function (value, errMessage, max) {
    if (value.length >= max) {
        errMessage.innerHtml = "** please input less than ".concat(max, " characters !!");
        return false;
    }
    errMessage.innerHtml = '';
    return true;
};
//Regex function constructure
var isRegex = function (value, errMessage, regex, errRegex) {
    if (!regex.test(value)) {
        errMessage.innerHTML = errRegex;
        return false;
    }
    errMessage.innerHTML = '';
    return true;
};
// between lenght characters input function constructure
var isBetween = function (value, errMessage, min, max) {
    if (value.length < min || value.length > max) {
        errMessage.innerHTML = "Characters lenght must be between ".concat(min, " and ").concat(max);
        return false;
    }
    errMessage.innerHTML = '';
    return true;
};
//------------------------------------------------------------------------------------------------------------
//format phone constructure function
var formatPhone = function (phone) {
    phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return phone;
};
//format name constructure function
var formatName = function (name) {
    var arrName = name.split(' ');
    for (var i = 0; i < arrName.length; i++) {
        arrName[i] = arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1);
    }
    return arrName.join(' ');
};
//format birthday constructure function
var formatBirthday = function (birthday) {
    var day = new Date(birthday).getDate();
    var month = new Date(birthday).getMonth() + 1;
    var year = new Date(birthday).getFullYear();
    if (day < 10) {
        return (birthday = "0".concat(day, " - ").concat(month, " - ").concat(year));
    }
    else if (month < 10) {
        return (birthday = "".concat(day, " - 0").concat(month, " - ").concat(year));
    }
    else if (year < 1930 || year > 2022) {
        // errBirthday.innerHTML = 'Please check your ages !!';
        return false;
    }
    birthday = "".concat(day, " - ").concat(month, " - ").concat(year);
    return birthday;
};
//-------------------------------------------------------------------------------------------------------------
//add Name constructure function
var addName = function (name, errName, typename) {
    var regName = /á|à|ạ|ã|ả|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẫ|ẩ|ậ|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ể|ễ|ệ|ì|í|ĩ|ị|ỉ|ò|ó|ỏ|õ|ọ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ|ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ữ|ử|ự|ý|ỳ|ỹ|ỵ|ỷ|đ|^[a-zA-Z]+([a-zA-Z]|\s)+$/;
    var errRegex = '** wrong format input value !!';
    if (!isRequired(name, errName, typename)) {
        return false;
    }
    else if (!isMax(name, errName, 50)) {
        return false;
    }
    else if (!isRegex(name, errName, regName, errRegex)) {
        return false;
    }
    return true;
};
//add Email constructure function
var addEmail = function (email, errEmail, typename) {
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errRegex = '** Invalid email format (ex: nguyentuankiet0105@gmail.com ) !!';
    if (!isRequired(email, errEmail, typename)) {
        return false;
    }
    else if (!isRegex(email, errEmail, regEmail, errRegex)) {
        return false;
    }
    return true;
};
//add Phone constructure function
var addPhone = function (phone, errPhone, typename) {
    var regPhone = /((0)+([0-9]{9})\b)/g;
    var errRegex = '** Begin at 0, at least 10 number ( ex: 0123456789 )!!';
    if (!isRequired(phone, errPhone, typename)) {
        return false;
    }
    else if (!isRegex(phone, errPhone, regPhone, errRegex)) {
        return false;
    }
    return true;
};
//add Birthday constructure function
var addBirthday = function (birthday, errBirthday, typename) {
    if (!isRequired(birthday, errBirthday, typename)) {
        return false;
    }
    return true;
};
//add Password constructure function
var addPassword = function (password, errPassword) {
    var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var errorRegex = 'Password has at least one special character, number and uppercase letter';
    if (isRegex(password, errPassword, regPassword, errorRegex)) {
        return false;
    }
    return true;
};
//function load image -------------------------------------------------
var reader = new FileReader();
var uploadImg = function () {
    var avatar = document.getElementById('avatar');
    var avatars = document.getElementById('avatars');
    var imgLoad = document.getElementById('file').files[0];
    reader.addEventListener('load', function () {
        // convert image file to base64 string
        avatar.src = reader.result;
        avatars.src = reader.result;
    }, false);
    reader.readAsDataURL(imgLoad);
};
var checkCfmPassword = function (password, cfmPassword, errCfmPassword) {
    if (password !== cfmPassword) {
        errCfmPassword.innerHTML = "cfmPassword and password not match ";
        return false;
    }
    return true;
};
//----------------------------------------------------------------------
//Reset function
var resetForm = function () {
    location.reload();
};
// function keyup
document.onkeyup = function (event) {
    if (event.key == 'Shift') {
        submissions();
    }
    if (event.key == 'Delete') {
        resetForm();
    }
};
