CREATE TABLE clinic_appointments (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(150) NOT NULL,
    patient_id VARCHAR(50) NOT NULL,
    therapist_name VARCHAR(150) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('scheduled','confirmed','completed','cancelled','no-show')) DEFAULT 'scheduled',
    type VARCHAR(20) CHECK (type IN ('therapy','consultation','follow-up','assessment')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);