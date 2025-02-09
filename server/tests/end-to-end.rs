mod common;

use common::api_request;
use serde_json::json;
use tokio::sync::OnceCell;

static TOKEN: OnceCell<String> = OnceCell::const_new();

async fn get_auth_token() -> String {
    TOKEN.get_or_init(|| async {
        let response = api_request(
            "POST",
            "/api/login",
            None,
            Some(serde_json::json!({
                "email": "john.doe@example.com",
                "password": "securePassword123"
            })),
        )
        .await;

        let response_body: serde_json::Value = response.json().await.unwrap();
        response_body["token"].as_str().unwrap().to_string()
    })
    .await
    .clone()
}

#[tokio::test]
async fn server_status_is_responsive() {
    let response = api_request(
        "GET",
        "/",
        None,
        None
    )
    .await;

    assert_eq!(response.status(), 200);
}

#[tokio::test]
async fn auth_register_creates_user() {
    let response = api_request(
        "POST",
        "/api/register",
        None,
        Some(json!({
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "securePassword123"
        })),
    )
    .await;

    assert_eq!(response.status(), 201);
}

#[tokio::test]
async fn auth_login_returns_token() {
    let response = api_request(
        "POST",
        "/api/login",
        None,
        Some(json!({
            "email": "john.doe@example.com",
            "password": "securePassword123"
        })),
    )
    .await;

    assert_eq!(response.status(), 200);

    let body: serde_json::Value = response.json().await.unwrap();
    assert!(body["token"].is_string());
}

#[tokio::test]
async fn auth_profile_fetches_user() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/users/1", Some(&token), None).await;
    assert_eq!(response.status(), 200);

    let body: serde_json::Value = response.json().await.unwrap();
    assert_eq!(body["id"], 1);
}

#[tokio::test]
async fn sleeplog_add_saves_entry() {
    let token = get_auth_token().await;

    let response = api_request(
        "POST",
        "/api/sleep-logs",
        Some(&token),
        Some(json!({
            "sleep_start": "2025-01-25T22:00:00Z",
            "sleep_end": "2025-01-26T06:00:00Z"
        })),
    )
    .await;

    assert_eq!(response.status(), 201);
}

#[tokio::test]
async fn sleeplog_get_returns_logs() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/sleep-logs", Some(&token), None).await;
    assert_eq!(response.status(), 200);

    let body: serde_json::Value = response.json().await.unwrap();
    assert!(body["sleep_logs"].is_array());
}

#[tokio::test]
async fn sleeplog_delete_removes_entry() {
    let token = get_auth_token().await;

    let response = api_request("DELETE", "/api/sleep-logs/1", Some(&token), None).await;
    assert_eq!(response.status(), 200);
}

#[tokio::test]
async fn energylog_add_saves_entry() {
    let token = get_auth_token().await;

    let response = api_request(
        "POST",
        "/api/energy-logs",
        Some(&token),
        Some(json!({
            "energy_level": 7,
            "reason": "Workout"
        })),
    )
    .await;

    assert_eq!(response.status(), 201);
}

#[tokio::test]
async fn energylog_get_returns_logs() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/energy-logs", Some(&token), None).await;
    assert_eq!(response.status(), 200);
}

#[tokio::test]
async fn energylog_delete_removes_entry() {
    let token = get_auth_token().await;

    let response = api_request("DELETE", "/api/energy-logs/1", Some(&token), None).await;
    assert_eq!(response.status(), 200);
}

#[tokio::test]
async fn insights_fetch_returns_data() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/insights", Some(&token), None).await;
    assert_eq!(response.status(), 200);

    let body: serde_json::Value = response.json().await.unwrap();
    assert!(body["insights"].is_array());
}