<?php
/**
 * Created by PhpStorm.
 * User: Louis
 * Date: 20/03/2019
 * Time: 15:20
 */

namespace App\Services;


use Curl\Curl;

class CurlService
{
    private const API_KEY = "c779dead472749eeb0316fd75e2c3f06";
    private const API_URL = "https://api.ozae.com";

    public const ARTICLES_URI = "/gnw/articles";
    public const ARTICLE_URL = "/gnw/article/?";

    public function initCurl(string $url, array $data): Curl
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