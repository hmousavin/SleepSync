use actix_web::{delete, get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
struct RegisterRequest {
    name: String,
    email: String,
    password: String,
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
async fn register_user(data: web::Json<RegisterRequest>) -> impl Responder {
    println!(
        "User Registered: name={}, email={}, password={}",
        data.name, data.email, data.password
    );
    // HttpResponse::Created().json(serde_json::json!({
    //     "message": "User registered successfully"
    // }))
    HttpResponse::NotImplemented()
}

#[post("/api/login")]
async fn login_user(data: web::Json<LoginRequest>) -> impl Responder {
    println!(
        "User logined: email={}, password={}",
        data.email, data.password
    );
    // HttpResponse::Ok().json(AuthResponse { token: "fake_token_123".to_string() })
    HttpResponse::NotImplemented()
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
    println!("starting to listen on {}:{}", LOCAL_SERVER, PORT);

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .service(register_user)
            .service(login_user)
            .service(fetch_users)
            .service(add_sleep_logs)
            .service(fetch_sleep_logs)
            .service(delete_sleep_logs)
            .service(add_energy_logs)
            .service(fetch_energy_logs)
            .service(test_delete_energy_logs)
            .service(fetch_insights)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}