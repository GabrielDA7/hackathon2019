<?php
/**
 * Created by PhpStorm.
 * User: Louis
 * Date: 19/03/2019
 * Time: 14:20
 */

namespace App\Controller;


use Curl\Curl;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class AjaxController
 * @package App\Controller
 * @Route(name="app_ajax_", path="/ajax")
 */
class AjaxController extends AbstractController
{
    private $serializer;

    private const API_KEY = "c779dead472749eeb0316fd75e2c3f06";
    private const API_URL = "https://api.ozae.com";

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Route(name="find_by_words", path="/find/by/words/")
     * @param Request $request
     * @return Response
     */
    public function findByWords(Request $request) : Response
    {
        $data = [
            'query' => $request->get("query"),
            'date' => $request->get("edition"),
            'edition' => $request->get("date"),
            'hard_limit' => $request->get("limit"),
            'topic' => $request->get("theme"),
        ];
        $curl = $this->initCurl('/gnw/articles', $data);
        return new Response($curl->getResponse());
    }

    private function initCurl(string $url, array $data) : Curl
    {
        try {
            $curl = new Curl();
        } catch (\ErrorException $e) {
            return null;
        }
        $data["key"] = self::API_KEY;
        $curl->setHeader('Content-Type', 'application/json');
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->get(self::API_URL . $url, $data);
        return $curl;
    }

}