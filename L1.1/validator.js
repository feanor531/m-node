let Validator = {
    validateEmail(email) {
        const regexp = /^[a-z0-9][a-z0-9-.+]{1,19}@[\w.!$%&’*+/=?^-]{1,15}\.[a-z]{1,5}$/i;
        return regexp.test(email);
    },

    validatePhone(phone) {
        const regexp = /^(\+?([- ]*)(\d[- ]*){2})?([- ]*)((\(([- ]*)(\d[- ]*){3}\))|(([- ]*)(\d[- ]*){3}))([- ]*)(\d[- ]*){7}$/;
        return phone.length > 25 ? false : regexp.test(phone);
    },

    validatePassword(pass) {
        const regexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{8,}$/;
        return regexp.test(pass);
    },
};

console.log("\nvalidateEmail test\n");

let mail = {
    "fi@secondpart.end" : true,
    "first-part@.se=cond%p.art.end" : true,
    "first.part@se=cond%part.r" : true,
    "first-partkfkfkfkfkfk@.se=cond%p.art.end" : false,
    "f@secondart.end," : false,
    "first-part@.se=cond@part.end" : false,
    "-firstpart@.se=cond%.enddeded" : false,
    "firs_tpart@.se.en" : false,
    "firstpart@.se.enddeded" : false,
    "_first.part@se=cond%part.r" : false,
    "+first.part@se=cond%part.r" : false,
};

for (const key in mail) {
    if (Object.hasOwnProperty.call(mail, key)) {
        console.log((Validator.validateEmail(key) === mail[key] ? "Pass" : "Fail") + " : "  + key);       
    }
}

console.log("\nvalidatePhone test\n");

let phone = {
    '+38 (099) 567                                                   8901' : false,
    '+38 (099) 567 8901' : true,
    '+38 099 5 6 7 8 9  01' : true,
    '(09-9) 567-890-1' : true,
    '--  (099) 567 890-1' : true,
    '+38 (099) 567 8901 0' : false,
    '+38 099 a0000000' : false,
    '+38 (0989) 567 8901' : false,
    '+48 099) 567 8901' : false,
};

for (const key in phone) {
    if (Object.hasOwnProperty.call(phone, key)) {
        console.log((Validator.validatePhone(key) === phone[key] ? "Pass" : "Fail") + " : "  + key);       
    }
}

console.log("\nalidatePassword test\n");

let pass = {
    'C00l_Pass' : true,
    '10SupperPas' : true,
    'SupperPas1' : true,
    'Cool_pass' : false,
    'cool_password' : false,
    'C00l_Pa' : false,
    'COOOOOOOL111' : false,
    'C00l_Pass+' : false,
    'C00l' : false,
    'COOl_Pass' : false,
};


for (const key in pass) {
    if (Object.hasOwnProperty.call(pass, key)) {
        console.log((Validator.validatePassword(key) === pass[key] ? "Pass" : "Fail") + " : " + key);        
    }
}
