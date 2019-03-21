<?php
/**
 * Created by PhpStorm.
 * User: Louis
 * Date: 19/03/2019
 * Time: 14:20
 */

namespace App\Controller;


use App\CurlService;
use Curl\Curl;
use DateInterval;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    private $curlService;

    private const API_KEY = "c779dead472749eeb0316fd75e2c3f06";
    private const API_URL = "https://api.ozae.com";
    private const DEFAULT_EDITION = "fr-fr";

    public function __construct(SerializerInterface $serializer, CurlService $curlService)
    {
        $this->serializer = $serializer;
        $this->curlService = $curlService;
    }

    /**
     * @Route(name="find_by_words", path="/find/articles/")
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function findArticles(Request $request) : JsonResponse
    {
        $data = $this->extractRequestParam($request);
        $topics = $this->explodeTopics($request);

        $articlesByTopic = $this->computeArticlesByTopic($request, $topics);

        $articles = [];
        foreach ($topics as $topic) {
            $data['topic'] = $topic;
            $curl = $this->curlService->initCurl($this->curlService::ARTICLES_URI, $data);
            if ($curl == null)
                continue;

            $response = json_decode($curl->getResponse(), true);
            $articles = $response["articles"];

            $articles = array_slice($articles, 0, $articlesByTopic);
        }
        return new JsonResponse($articles);
    }

    private function extractRequestParam(Request $request) : array
    {
        return [
            'query' => $request->get("query"),
            'hours' => $request->get("hours"),
            'edition' => $request->get("edition") ?? self::DEFAULT_EDITION,
            'hard_limit' => $request->get("limit"),
            'topic' => $request->get("topics"),
        ];
    }

    /**
     * @param Request $request
     * @return Response
     * @throws \ErrorException
     * @Route(path="/test")
     */
    public function test(Request $request)
    {
        $curl = new Curl();
        $curl->setHeader('Content-Type', 'application/json');
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->get(self::API_URL . '/gnw/articles', array(
            'query' => $request->get("query"),
            'key' => self::API_KEY,
            'date' => "20180701__20180702",
            'edition' => "fr-fr",
            'hard_limit' => 10
        ));
        return new Response($curl->getResponse());
    }

    private function formatDate(string $daysToSubtract) : string
    {
        if ($daysToSubtract == null)
            return null;

        $todayDate = date("Ymd");
        try {
            $startDate = new DateTime($todayDate);
        } catch (\Exception $e) {
            $startDate = date("ymd");
        }
        try {
            $startDate->sub(new DateInterval('P' . $daysToSubtract . 'D'));
        } catch (\Exception $e) {
            $startDate = date("ymd");
        }
        $startDate = $startDate->format('Ymd');
        return $startDate . "__" . $todayDate;
    }

    private function explodeTopics(Request $request) : array
    {
        $topics = $request->get("topics") ?? "all";
        return explode("-", $topics);
    }

    private function computeArticlesByTopic(Request $request, array $topics) : int
    {
        $limit = $request->get("limit") ?? 100;
        $articlesByTopic = $limit / count($topics);
        if (is_float($articlesByTopic))
            $articlesByTopic = intval($articlesByTopic);
        return $articlesByTopic;
    }
}