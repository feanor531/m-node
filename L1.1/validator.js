let Validator = {
    validateEmail(email) {
        let regexp = /^[a-z0-9][a-z0-9-.+]{1,19}@[\w.!$%&’*+/=?^-]{1,15}\.[a-z]{1,5}$/i;
        return regexp.test(email);
    },

    validatePhone(phone) {

    },

    validatePassword(pass) {

    },
};

let mail = ["fi@secondpart.end",
    "first-part@.se=cond%p.art.end",
    "first.part@se=cond%part.r",
    "first-partkfkfkfkfkfk@.se=cond%p.art.end",
    "f@secondart.end,",
    "first-part@.se=cond@part.end",
    "-firstpart@.se=cond%.enddeded",
    "firs_tpart@.se.en",
    "firstpart@.se.enddeded",
    "_first.part@se=cond%part.r",
    "+first.part@se=cond%part.r"];

mail.forEach(element => {
    console.log(element + " : "  + Validator.validateEmail(element));
});    

