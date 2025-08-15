<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPassword extends Notification
{
    use Queueable;

    /**
     * Token de redefinição de senha.
     *
     * @var string
     */
    public $token;

    /**
     * Cria uma nova instância de notificação.
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Canais pelos quais a notificação será enviada.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Gera o e-mail da notificação.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $resetUrl = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));

        return (new MailMessage)
            ->greeting('Olá!')
            ->line('Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha para a sua conta.')
            ->action('Redefinir Senha', $resetUrl)
            ->line('Este link de redefinição irá expirar em 60 minutos.')
            ->line('Se você não solicitou a redefinição de senha, nenhuma ação é necessária.')
            ->salutation('Atenciosamente, ' . config('app.name'));
    }
}
