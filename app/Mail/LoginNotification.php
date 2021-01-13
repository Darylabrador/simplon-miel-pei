<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $identity;
    public $remoteip;
    public $datenow;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($identity, $remoteip, $datenow)
    {
        $this->identity = $identity;
        $this->remoteip = $remoteip;
        $this->datenow = $datenow;
        $this->subject('Miel Péi - Connexion');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.loginNotification');
    }
}
