use mongodb::bson;
use serde::{Deserialize, Serialize};
use bson::oid::ObjectId;

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>, // mongo auto-generates this
    pub fullname: String,
    pub email: String,
    pub password: String, // hashed password
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthToken {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub user_id: ObjectId,
    pub token: String,  // JWT or session token
    pub expires_at: chrono::DateTime<chrono::Utc>,
}

// todo!("add the notes an an enum")
// #[derive(Debug, Serialize, Deserialize)]
// struct SleepSession {
//     #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
//     id: Option<ObjectId>,
//     user_id: ObjectId,  // Reference to User
//     start_time: chrono::DateTime<chrono::Utc>,
//     end_time: chrono::DateTime<chrono::Utc>,
//     quality_score: Option<u8>,  // 0-100 scale
//     notes: Option<String>,
// }