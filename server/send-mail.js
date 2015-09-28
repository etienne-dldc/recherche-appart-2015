var restify = require('restify');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var validator = require('validator');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25,
    auth: {
        user: 'contact@appart.etiennedeladonchamps.fr',
        pass: 'twik0mail'
    },
    tls: {rejectUnauthorized: false}
}));

// var transporter = nodemailer.createTransport(smtpTransport({
//     host: 'localhost',
//     port: 1025,
//     auth: null,
//     tls: {rejectUnauthorized: false}
// }));

 
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
 
server.post('/send-mail', function (req, res, next) {

    var name = validator.escape(req.params.nom);
    var mail = validator.escape(req.params.mail);
    var message = validator.escape(req.params.message);
    
    // ######
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // ######

    var errors = [];
    if ( validator.isNull(name) ) {
        errors.push(['nom', 'Merci de rensigner ton nom.'])
    } else
    if ( !validator.isLength(name, 4) ) {
        errors.push(['nom', 'Ton nom doit faire plus de 4 caractères.']);
    };

    if ( validator.isNull(mail) ) {
        errors.push(['mail', 'Merci de rensigner ton mail.']);
    } else
    if ( !validator.isEmail(mail) ) {
        errors.push(['mail', 'Merci de rensigner un mail valide.']);
    };

    if ( validator.isNull(message) ) {
        errors.push(['message', 'Heu... t\'as oublié le message.']);
    } else
    if ( !validator.isLength(message, 5) ) {
        errors.push(['message', 'Tu pourrai écrire plus que 5 caractères quand même.']);
    };
    
    if (errors.length > 0) {
        res.send( {
            success: false,
            notValid: true,
            errors: errors
        } );
        return next();
    }

    var html = "";
    html += '<h4>' + name + ' à écrit :</h4>';
    html += '<p>' + message + '</p>';

    transporter.sendMail({
        from: 'Site Appart <contact@appart.etiennedeladonchamps.fr>',
        to: 'Etienne DLDC <etienne.dldc@outlook.fr>',
        replyTo: name + ' <' + mail + '>',
        subject: '[APPART] Message de ' + name + ' <' + mail + '>' ,
        text: message,
        html: html
    }, function (error, info) {
        if (error) {
            res.send( {
                success: false,
                name: name,
                error: error
            } );
        } else {
            res.send( {
                success: true,
                name: name,
                info: info
            } );
        }
        return next();
    });

});
 
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

/*
//We need a function which handles requests and send response
function handleRequest(request, response){
    
}
*/