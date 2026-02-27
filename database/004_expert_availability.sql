CREATE TABLE expert_availability (
    id SERIAL PRIMARY KEY,
    expert_name VARCHAR(150) NOT NULL,
    specialization VARCHAR(150),
    is_available BOOLEAN DEFAULT true,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
