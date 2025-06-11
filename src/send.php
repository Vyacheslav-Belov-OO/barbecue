<?php
// Устанавливаем заголовок Content-Type для JSON
header('Content-Type: application/json');

// === Google reCAPTCHA v2 validation ===
$recaptchaSecret = '6Lcr1VwrAAAAAH3O6Fu03B46OOevSFEbCVyfcpUO'; // <-- СЕКРЕТНЫЙ КЛЮЧ ДЛЯ reCAPTCHA

// Создаем файл для логирования ошибок reCAPTCHA
function logRecaptchaError($message) {
    file_put_contents('recaptcha_errors.log', date('Y-m-d H:i:s') . ' - ' . $message . "\n", FILE_APPEND);
}

// Проверяем наличие токена капчи
if (empty($_POST['g-recaptcha-response'])) {
    logRecaptchaError("Missing g-recaptcha-response token");
    echo json_encode(['result'=>'error','info'=>'Не пройдена проверка reCAPTCHA']);
    exit;
}

$recaptcha = $_POST['g-recaptcha-response'];
$remoteip = $_SERVER['REMOTE_ADDR'];

// Используем cURL вместо file_get_contents для более надежного соединения
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret' => $recaptchaSecret,
    'response' => $recaptcha,
    'remoteip' => $remoteip
];

// Инициализируем cURL
$curl = curl_init();

// Устанавливаем параметры cURL
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true); // Проверка SSL сертификата

// Выполняем запрос
$response = curl_exec($curl);
$error = curl_error($curl);

// Проверяем на ошибки cURL
if ($error) {
    logRecaptchaError("cURL Error: " . $error);
    echo json_encode(['result'=>'error','info'=>'Ошибка проверки reCAPTCHA: не удалось подключиться к серверу Google']);
    exit;
}

// Закрываем соединение curl
curl_close($curl);

// Декодируем ответ
$recaptchaData = json_decode($response, true);

// Логируем ответ для отладки
logRecaptchaError("Response: " . print_r($recaptchaData, true));

// Проверяем успешность проверки
if (!isset($recaptchaData['success']) || $recaptchaData['success'] !== true) {
    $errorMsg = isset($recaptchaData['error-codes']) ? implode(', ', $recaptchaData['error-codes']) : 'неизвестная ошибка';
    logRecaptchaError("Validation failed: " . $errorMsg);
    echo json_encode(['result'=>'error','info'=>'Ошибка проверки reCAPTCHA: ' . $errorMsg]);
    exit;
}
// === END reCAPTCHA validation ===

// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Добавляем логирование входящих данных
file_put_contents('debug_log.txt', date('Y-m-d H:i:s') . " - POST data: " . print_r($_POST, true) . "\n", FILE_APPEND);

# проверка, что ошибки нет
if (!error_get_last()) {

    // Переменные, которые отправляет пользователь
    $name = !empty($_POST['name']) ? $_POST['name'] : 'Не указано';
    $surname = !empty($_POST['surname']) ? $_POST['surname'] : '';
    $phone = !empty($_POST['phone']) ? $_POST['phone'] : 'Не указано';
    $email = !empty($_POST['email']) ? $_POST['email'] : 'Не указано';
    $text = !empty($_POST['text']) ? $_POST['text'] : 'Не указано';
    
    // Дополнительные поля, которые могут быть в форме
    $model = !empty($_POST['model']) ? $_POST['model'] : '';
    $color = !empty($_POST['color']) ? $_POST['color'] : '';
    
    // Добавляем отладочную информацию о переменных
    file_put_contents('debug_vars.txt', date('Y-m-d H:i:s') . " - Variables:\nname: $name\nphone: $phone\nemail: $email\ntext: $text\nmodel: $model\ncolor: $color\n\n", FILE_APPEND);
    
    // Формирование самого письма
    $title = "Заявка с сайта Мангал-очаг"; // Заголовок письма
    
    // Создаем тело письма
    $body = "
    <h2>Новая заявка с сайта</h2>
    <b>Имя:</b> $name<br>
    ";
    
    // Добавляем фамилию, если она есть
    if (!empty($surname)) {
        $body .= "<b>Фамилия:</b> $surname<br>";
    }
    
    $body .= "
    <b>Телефон:</b> $phone<br>
    <b>Почта:</b> $email<br>
    ";
    
    // Добавляем модель, если она есть
    if (!empty($model)) {
        $body .= "<b>Модель:</b> $model<br>";
    }
    
    // Добавляем цвет, если он есть
    if (!empty($color)) {
        $body .= "<b>Цвет столешницы:</b> $color<br>";
    }
    
    $body .= "<br><b>Сообщение:</b><br>$text";
    
    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};
    
    // Настройки Gmail SMTP
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервер Gmail
    $mail->Username   = 'promixmebel@gmail.com'; // Ваш Gmail адрес
    $mail->Password   = 'odvv aswo qlnk akhb'; // Пароль приложения
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->setFrom('promixmebel@gmail.com', 'Мангал-очаг'); // Адрес отправителя и имя
    
    // Получатель письма
    $mail->addAddress('promixmebel@gmail.com'); // Куда приходят письма
    
    
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = "Заявка с сайта Мангал-очаг"; // Явно устанавливаем заголовок
    $mail->Body = $body;
    $mail->AltBody = strip_tags($body); // Текстовая версия письма для клиентов без HTML
    
    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }

// Возвращаем данные в формате JSON
echo json_encode($data);
exit; // Прерываем выполнение скрипта, чтобы не было перенаправления

} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Отправка результата
header('Content-Type: application/json');
echo json_encode($data);

?>