<?php

namespace App\Controller;

use Pusher\Pusher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    #[Route('/game', name: 'app_game')]
    public function index(): Response
    {
        $pusher = new Pusher('d6af46ae18da6d9657e1', 'b3c8563347a36324b9cc', '1482040', ['cluster' => 'eu']);
        $pusher->trigger('my-channel', 'my-event', [

            'message' => 'heeeeellllloooooo'

        ]);

        return $this->render('game/game.html.twig');
    }
}
