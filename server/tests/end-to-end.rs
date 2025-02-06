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

// ✅ **1. User Registration**
#[tokio::test]
async fn test_register_user() {
    let response = api_request(
        "POST",
        "/api/users",
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

// ✅ **2. User Login**
#[tokio::test]
async fn test_login() {
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

// ✅ **3. Fetch User Profile**
#[tokio::test]
async fn test_get_user_profile() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/users/1", Some(&token), None).await;
    assert_eq!(response.status(), 200);

    let body: serde_json::Value = response.json().await.unwrap();
    assert_eq!(body["id"], 1);
}

// ✅ **4. Add Sleep Log**
#[tokio::test]
async fn test_add_sleep_log() {
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

// ✅ **5. Get Sleep Logs**
#[tokio::test]
async fn test_get_sleep_logs() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/sleep-logs", Some(&token), None).await;
    assert_eq!(response.status(), 200);

    let body: serde_json::Value = response.json().await.unwrap();
    assert!(body["sleep_logs"].is_array());
}

// ✅ **6. Delete Sleep Log**
#[tokio::test]
async fn test_delete_sleep_log() {
    let token = get_auth_token().await;

    let response = api_request("DELETE", "/api/sleep-logs/1", Some(&token), None).await;
    assert_eq!(response.status(), 200);
}

// ✅ **7. Add Energy Log**
#[tokio::test]
async fn test_add_energy_log() {
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

// ✅ **8. Get Energy Logs**
#[tokio::test]
async fn test_get_energy_logs() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/energy-logs", Some(&token), None).await;
    assert_eq!(response.status(), 200);
}

// ✅ **9. Delete Energy Log**
#[tokio::test]
async fn test_delete_energy_log() {
    let token = get_auth_token().await;

    let response = api_request("DELETE", "/api/energy-logs/1", Some(&token), None).await;
    assert_eq!(response.status(), 200);
}

// ✅ **10. Fetch Insights**
#[tokio::test]
async fn test_get_insights() {
    let token = get_auth_token().await;

    let response = api_request("GET", "/api/insights", Some(&token), None).await;
    assert_eq!(response.status(), 200);

    let body: serde_json::Value = response.json().await.unwrap();
    assert!(body["insights"].is_array());
}