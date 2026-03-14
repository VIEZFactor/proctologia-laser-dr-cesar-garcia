<?php

require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "NO";
    return;
}

$nameSite = "Alyvia Proctologia Laser";
$website = "alyviaproctologialaser.com";
$title = "Contacto en $nameSite";

$contactName = trim($_POST["name"]);
$contactSubject = trim($_POST["subject"]);
$contactPhone = trim($_POST["phone"]);
$contactMessage = trim($_POST["message"]);

if(empty($contactName) || empty($contactSubject) || empty($contactPhone) || empty($contactMessage)){
    echo json_encode(array(
        'error' => true,
        'mensaje' => "Llene todos los campos para envíar el mensaje",
        'name' => $contactName,
        'subject' => $contactSubject,
        'phone' => $contactPhone,
        'message' => $contactMessage,
    ));
    return;
}

$gmailEmail = "viezfactor@gmail.com";
$gmailPassword = "otli nglj myfv brxx";

$mail = new PHPMailer(true);

// False if this code it's in localhost or another server without SSL
$hasSSL = true;

//Configure an SMTP
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';

if(!$hasSSL){
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
}

$mail->SMTPAuth = true;
$mail->Username = $gmailEmail;
$mail->Password = $gmailPassword;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

// Sender information
$mail->setFrom('no-responder@alyviaproctologialaser.com', $nameSite);

// Multiple recipient email addresses and names
// Primary recipients
$mail->addAddress('alyviaproctologialaser@gmail.com');
// $mail->addAddress('villarrealbli01@gmail.com');
// $mail->addAddress('RECIPIENT_EMAIL_ADDRESS_2', 'RECIPIENT_NAME_2');

// Adding CC recipients
// $mail->addCC('CC_EMAIL_ADDRESS_1', 'CC_NAME_1');
// $mail->addCC('CC_EMAIL_ADDRESS_2', 'CC_NAME_2');

// Adding BCC recipients
$mail->addBCC('contacto@viezfactor.com');
// $mail->addBCC('BCC_EMAIL_ADDRESS_2', 'BCC_NAME_2');

//Attach an image file
// $mail->addAttachment('images/phpmailer_mini.png');

$message  = "<html>";
$message .= "<head><title>$title</title></head>";
$message .= "<body>";
$message .= "<p>Se recibió un formulario de contacto nuevo, los datos son los siguientes </p>";
$message .= "<table border='1'>";
$message .= "<tr><td><b>Nombre</b></td><td>$contactName</td></tr>";
$message .= "<tr><td><b>Asunto</b></td><td>$contactSubject</td></tr>";
$message .= "<tr><td><b>Teléfono</b></td><td>$contactPhone</td></tr>";
$message .= "<tr><td><b>Mensaje</b></td><td>$contactMessage</td></tr>";
$message .= "</table>";
$message .= "<p>Este correo se recibió desde el sitio de $website, favor de registrar este correo como contacto para evitar que los correos se vayan a NO DESEADOS en la medida de lo posible.</p>";
$message .= "</body>";
$message .= "</html>";


$mail->isHTML(TRUE);
$mail->Subject = "Mensaje recibido desde el sitio de $nameSite";
$mail->Body    = $message;
$mail->AltBody = "Mensaje recibido desde el sitio de $nameSite";

// Attempt to send the email
if (!$mail->send()) {
    echo json_encode(array(
        'error' => true,
        'mensaje' => "Ha surgido un problema al enviar el formulario, intente más tarde.",
        'name' => $contactName,
        'subject' => $contactSubject,
        'phone' => $contactPhone,
        'message' => $contactMessage,
    ));
    // echo 'Email not sent. An error was encountered: ' . $mail->ErrorInfo;
} else {

    echo json_encode(array(
        'error' => false,
        'mensaje' => "Gracias por su mensaje, pronto nos estaremos comunicando con usted.",
        'name' => $contactName,
        'subject' => $contactSubject,
        'phone' => $contactPhone,
        'message' => $contactMessage,
    ));
    // echo 'Message has been sent.';
}

$mail->smtpClose();