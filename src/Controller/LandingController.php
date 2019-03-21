<?php

namespace App\Controller;

use App\CurlService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class LandingController
 * @package App\Controller
 * @Route(name="app_home_", path="/")
 */
class LandingController extends AbstractController
{
    private $curlService;

    private const ONE_DAY = 24;
    private const TOP_LIMIT = 5;

    public function __construct(CurlService $curlService)
    {
        $this->curlService = $curlService;
    }

    /**
     * @Route(name="index")
     */
    public function index()
    {
        return $this->render('landing/index.html.twig', [
        ]);
    }
}
