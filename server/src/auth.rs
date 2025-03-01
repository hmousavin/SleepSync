use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash, PasswordHasher, PasswordVerifier, SaltString
    },
    Argon2
};

pub fn hash_password(password: &str) -> String {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    argon2.hash_password(password.as_bytes(), &salt).unwrap().to_string()

    // match argon2.hash_password(password.as_bytes(), &salt) {
    //     Ok(hashed) => Ok(hashed.to_string()),
    //     Err(_) => Err("Failed to hash password".into()),
    // }
}

pub fn verify_password(password: &str, hash: &str) -> bool {
    let parsed_hash = PasswordHash::new(&hash).unwrap();
    Argon2::default().verify_password(password.as_bytes(), &parsed_hash).is_ok()

    // match PasswordHash::new(hash) {
    //     Ok(parsed_hash) => argon2.verify_password(password.as_bytes(), &parsed_hash).is_ok(),
    //     Err(_) => false, // If the hash format is invalid, return false
    // }
}