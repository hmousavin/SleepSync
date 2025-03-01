use std::env;

use actix_cors::Cors;
use actix_web::{delete, get, post, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use auth::{hash_password, verify_password};
use chrono::{Duration, Utc};
use db::connect_to_mongo;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use jwt::generate_jwt;
use models::{AuthToken, User};
use mongodb::bson::doc;
use serde::{Deserialize, Serialize};
use tracing::{info, Level};
use tracing_subscriber::FmtSubscriber;
mod db;
mod models;
mod auth;
mod jwt;

#[derive(Deserialize, Debug)]
struct RegisterRequest {
    fullname: String,
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: String,  // User ID
    exp: usize,   // Expiry timestamp
}

#[derive(Deserialize, Debug)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct AuthResponse {
    token: String,
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[post("/api/register")]
async fn register_user(req: web::Json<RegisterRequest>) -> impl Responder {
    let db = connect_to_mongo().await;
    let users = db.collection("users");

    let existing_user = users.find_one(doc! { "email": &req.email })
                                           .await
                                           .expect("find_one query failed on register_user");
    if existing_user.is_some() {
        return HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Email already registered"
        }));
    }
    
    let hashed_password = hash_password(&req.password);
    let new_user = User {
        id: None,
        fullname: req.fullname.clone(),
        email: req.email.clone(),
        password: hashed_password
    };
    let insert_result = users.insert_one(new_user)
                                              .await
                                              .expect("failed to insert user");
    let user_id = insert_result.inserted_id.as_object_id().unwrap().to_hex();
    let token = generate_jwt(&user_id);

    info!("User {} registered.", req.fullname);
    HttpResponse::Created().json(serde_json::json!({
        "message": "User registered successfully",
        "token": token
    }))
}

#[post("/api/login")]
async fn login(req: web::Json<LoginRequest>) -> impl Responder {
    let db = connect_to_mongo().await;
    let users = db.collection("users");

    let user: User = users.find_one(doc! { "email": &req.email })
                          .await
                          .unwrap()
                          .expect("Unable to find the user, on login");

    if !verify_password(&req.password, &user.password) {
        return HttpResponse::Unauthorized().json(serde_json::json!({
            "message": "Invalid credentials"
        }));
    }

    let user_id = user.id.unwrap();
    let expiration = Utc::now() + Duration::hours(24); // Token valid for 24 hours
    let claims = Claims {
        sub: user_id.to_hex(),
        exp: expiration.timestamp() as usize,
    };

    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
        .expect("Failed to create token");

    // Store token in the database (AuthToken collection)
    let auth_token = AuthToken {
        id: None,
        user_id,
        token: token.clone(),
        expires_at: expiration,
    };
    
    db.collection("auth_tokens").insert_one(auth_token).await.expect("Unable to insert new token, on login");

    info!("User {} logged in.", req.email);
    HttpResponse::Ok().json(serde_json::json!({
        "token": token,
        "message": "Login successful"
    }))
}

#[post("/api/logout")]
async fn logout(req: HttpRequest) -> impl Responder {
    let auth_header = req.headers().get("Authorization");

    if let Some(auth_value) = auth_header {
        if let Ok(token) = auth_value.to_str() {
            let token = token.strip_prefix("Bearer ").unwrap_or(token); // remove "Bearer " prefix
            let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

            // Validate the token
            let token_data = decode::<Claims>(
                token,
                &DecodingKey::from_secret(secret.as_ref()),
                &Validation::default(),
            );

            match token_data {
                Ok(decoded) => {
                    info!("User {} logged out successfully.", decoded.claims.sub);
                    return HttpResponse::Ok().json(serde_json::json!({
                        "message": "Logged out successfully"
                    }));
                }
                Err(_) => return HttpResponse::Unauthorized().json(serde_json::json!({
                    "error": "Invalid or expired token"
                })),
            }
        }
    }

    HttpResponse::Unauthorized().json(serde_json::json!({
        "error": "Missing token"
    }))
}

#[get("/api/users/{id}")]
async fn fetch_users(path: web::Path<i32>) -> impl Responder {
    let user_id = path.into_inner();
    // HttpResponse::Ok().json(serde_json::json!({
    //     "id": user_id,
    //     "name": "John Doe",
    //     "email": "john.doe@example.com"
    // }))
    HttpResponse::NotImplemented()
}

#[post("/api/sleep-logs")]
async fn add_sleep_logs() -> impl Responder {
    // HttpResponse::Created()
    HttpResponse::NotImplemented()
}

#[get("/api/sleep-logs")]
async fn fetch_sleep_logs() -> impl Responder {
    // HttpResponse::Ok().json(serde_json::json!({
    //     "sleep_logs": []
    // }))
    HttpResponse::NotImplemented()
}

#[delete("/api/sleep-logs/{id}")]
async fn delete_sleep_logs(path: web::Path<i32>) -> impl Responder {
    let user_id = path.into_inner();
    println!("Delete sleep log, id: {user_id}");
    // HttpResponse::Ok()
    HttpResponse::NotImplemented()
}

#[post("/api/energy-logs")]
async fn add_energy_logs() -> impl Responder {
    // HttpResponse::Created()
    HttpResponse::NotImplemented()
}

#[get("/api/energy-logs")]
async fn fetch_energy_logs() -> impl Responder {
    // HttpResponse::Ok()
    HttpResponse::NotImplemented()
}

#[delete("/api/energy-logs/{id}")]
async fn test_delete_energy_logs(path: web::Path<i32>) -> impl Responder {
    let energy_id = path.into_inner();
    println!("Delete energy id: {energy_id}");
    // HttpResponse::Ok()
    HttpResponse::NotImplemented()
}

#[get("/api/insights")] 
async fn fetch_insights() -> impl Responder {
    // HttpResponse::Ok().json(serde_json::json!({
    //     "insights": []
    // }))
    HttpResponse::NotImplemented()
}

const LOCAL_SERVER: &str = "127.0.0.1";
const PORT: &str = "8080";

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::INFO) // Log INFO and above
        .finish();
    tracing::subscriber::set_global_default(subscriber).expect("Failed to set logger");
    
    info!("🚀 starting to listen on {}:{}", LOCAL_SERVER, PORT);

    let address = format!("{}:{}", LOCAL_SERVER, PORT);
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .service(register_user)
            .service(login)
            .service(logout)
            .service(fetch_users)
            .service(add_sleep_logs)
            .service(fetch_sleep_logs)
            .service(delete_sleep_logs)
            .service(add_energy_logs)
            .service(fetch_energy_logs)
            .service(test_delete_energy_logs)
            .service(fetch_insights)
            .wrap(
                Cors::default()
                     .allow_any_origin()
                     .allowed_methods(vec!["GET", "POST", "DELETE", "PUT", "PATCH"])
                     .allowed_headers(vec!["Content-Type", "Authorization"])
                     .supports_credentials()
            )
    })
    .bind(address)?
    .run()
    .await
}