use reqwest::{Client, Response};
use serde_json::Value;

pub async fn api_request(
    method: &str,
    endpoint: &str,
    token: Option<&str>,
    body: Option<Value>,
) -> Response {
    let client = Client::new();
    let url = format!("http://localhost:8080{}", endpoint);

    let request = match method {
        "POST" => client.post(&url),
        "GET" => client.get(&url),
        "DELETE" => client.delete(&url),
        _ => panic!("Unsupported HTTP method"),
    };

    let request = if let Some(token) = token {
        request.bearer_auth(token)
    } else {
        request
    };

    let request = if let Some(body) = body {
        request.json(&body)
    } else {
        request
    };

    request.send().await.expect("API request failed")
}
