CREATE TABLE upcoming_appointments (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(150) NOT NULL,
    session_type VARCHAR(150),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    expert_id INT,
    status VARCHAR(20) DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);