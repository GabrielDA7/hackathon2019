<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class LandingController
 * @package App\Controller
 * @Route(name="app_home_", path="/")
 */
class LandingController extends AbstractController
{

    /**
     * @Route(name="index")
     */
    public function index()
    {
        return $this->render('landing/index.html.twig', [
        ]);
    }
}
