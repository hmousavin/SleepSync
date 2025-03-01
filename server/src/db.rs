use mongodb::{Client, Database};
use std::env;
use dotenv::dotenv;

pub async fn connect_to_mongo() -> Database {
    dotenv().ok();
    let mongo_uri = env::var("MONGO_URI").expect("MONGO_URI must be set");
    let client = Client::with_uri_str(mongo_uri)
        .await
        .expect("Failed to connect to MongoDB");

    let db_name = env::var("DATABASE_NAME").expect("DATABASE_NAME must be set");
    client.database(&db_name)
}