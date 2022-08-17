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

    },
};

// let mail = ["fi@secondpart.end",
//     "first-part@.se=cond%p.art.end",
//     "first.part@se=cond%part.r",
//     "first-partkfkfkfkfkfk@.se=cond%p.art.end",
//     "f@secondart.end,",
//     "first-part@.se=cond@part.end",
//     "-firstpart@.se=cond%.enddeded",
//     "firs_tpart@.se.en",
//     "firstpart@.se.enddeded",
//     "_first.part@se=cond%part.r",
//     "+first.part@se=cond%part.r"];

// mail.forEach(element => {
//     console.log(element + " : "  + Validator.validateEmail(element));
// });    

let phone = [
    '+38 (099) 567                                                   8901',
    '+38 099 5 6 7 8 9  01',
    '(09-9) 567-890-1',
    '--  (099) 567 890-1',
    '+38 (099) 567 8901 0',
    '+38 099 a0000000',
    '+38 (0989) 567 8901',
    '+48 (0989) 567 8901',
];
phone.forEach(element => {
    console.log(element + " : "  + Validator.validatePhone(element));
}); 
