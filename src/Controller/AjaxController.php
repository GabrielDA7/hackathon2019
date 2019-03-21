<?php
/**
 * Created by PhpStorm.
 * User: Louis
 * Date: 19/03/2019
 * Time: 14:20
 */

namespace App\Controller;


use App\Services\CurlService;
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

    private const DEFAULT_EDITION = "fr-fr";

    public function __construct(SerializerInterface $serializer, CurlService $curlService)
    {
        $this->serializer = $serializer;
        $this->curlService = $curlService;
    }

    /**
     * @Route(name="find_articles", path="/find/articles/")
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function findArticles(Request $request): JsonResponse
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
            $articles = array_merge($articles, $this->extractArticlesFromApiResponse($curl, $articlesByTopic));
        }
        return new JsonResponse($articles);
    }

    /**
     * @Route(name="find_article", path="/find/article/{id}")
     * @param int $id
     * @return Response
     */
    public function findArticle(int $id): Response
    {
        $uri = str_replace("?", $id, $this->curlService::ARTICLE_URL);
        $curl = $this->curlService->initCurl($uri, []);
        $response = json_decode($curl->getResponse(), true);
        return new JsonResponse($response);
    }

    private function extractArticlesFromApiResponse(Curl $curl, int $articlesByTopic): array
    {
        $response = json_decode($curl->getResponse(), true);
        $articles = $response["articles"];
        return array_slice($articles, 0, $articlesByTopic);
    }

    private function extractRequestParam(Request $request): array
    {
        return [
            'query' => $request->get("query"),
            'hours' => $request->get("hours"),
            'edition' => $request->get("edition") ?? self::DEFAULT_EDITION,
            'hard_limit' => $request->get("limit"),
            'topic' => $request->get("topics"),
        ];
    }

    private function formatDate(string $daysToSubtract): string
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

    private function explodeTopics(Request $request): array
    {
        $topics = $request->get("topics") ?? "all";
        return explode("-", $topics);
    }

    private function computeArticlesByTopic(Request $request, array $topics): int
    {
        $limit = $request->get("limit") ?? 100;
        $articlesByTopic = $limit / count($topics);
        if (is_float($articlesByTopic))
            $articlesByTopic = intval($articlesByTopic);
        return $articlesByTopic;
    }
}