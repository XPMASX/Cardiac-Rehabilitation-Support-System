import numpy as np
from perlin_noise import PerlinNoise
from datetime import datetime, timedelta
import mysql.connector

# Database connection
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="project_db"
)

def create_table():
    cursor = db_connection.cursor()
    create_table_query = """
    CREATE TABLE IF NOT EXISTS DadosDeSaude (
        NumUtenteSaude INT NOT NULL,
        Data DATETIME NOT NULL,
        BatCardiaco INT,
        Passos INT,
        PRIMARY KEY (NumUtenteSaude, Data)
    );
    """
    cursor.execute(create_table_query)
    cursor.close()

def generate_steps(start_date, end_date):
    steps_ts_values = []
    current_time = start_date

    while current_time <= end_date:
        total_steps = np.random.randint(3000, 8001)
        hourly_steps_active = np.random.poisson(total_steps / 12, 12)  # Generate steps for active hours (7 AM to 7 PM)
        hourly_steps_post_active = np.random.poisson(total_steps / 50, 3)  # Smaller increments after 7 PM to 10 PM

        accumulated_steps = 0

        for hour in range(24):
            if 7 <= hour < 19:  # Active hours (7 AM to 7 PM)
                steps = hourly_steps_active[hour - 7]
            elif 19 <= hour < 23:  # Post-active hours with smaller increments (7 PM to 10 PM)
                steps = hourly_steps_post_active[hour - 20]
            else:  # Sleep hours
                steps = 0

            accumulated_steps += steps
            steps_ts_values.append((1, current_time.replace(hour=hour).strftime('%Y-%m-%d %H:%M:%S'), int(accumulated_steps)))

        current_time += timedelta(days=1)  # Move to the next day

    return steps_ts_values

def generate_hr_ts(start_date, end_date, interval_minutes, noise):
    hr_ts_values = []
    current_time = start_date

    while current_time <= end_date:
        for i in range(int((24 * 60) / interval_minutes)):  # Number of intervals in a day
            hour = current_time.hour
            if 22 <= hour or hour < 6:  # Sleep hours
                noise_value = noise([current_time.timetuple().tm_yday / 365, current_time.hour / 24])
                random_factor = np.random.uniform(-3, 5)  # Introduce a random factor to vary HR more
                hr = 50 + int((noise_value + 1) * 5) + random_factor  # Scale noise to range [50, 60]
            elif 6 <= hour < 7:  # Waking up transition period
                transition_factor = (hour - 6) + (current_time.minute / 60)
                noise_value = noise([current_time.timetuple().tm_yday / 365, current_time.hour / 24])
                hr_sleep = 50 + int((noise_value + 1) * 5)  # Sleep range [50, 60]
                hr_active = 60 + int((noise_value + 1) * 10)  # Active range [60, 70]
                hr = int(hr_sleep * (1 - transition_factor) + hr_active * transition_factor)
            elif 21 <= hour < 22:  # Going to sleep transition period
                transition_factor = (hour - 21) + (current_time.minute / 60)
                noise_value = noise([current_time.timetuple().tm_yday / 365, current_time.hour / 24])
                hr_active = 60 + int((noise_value + 1) * 10)  # Active range [60, 70]
                hr_sleep = 50 + int((noise_value + 1) * 5)  # Sleep range [50, 60]
                hr = int(hr_active * (1 - transition_factor) + hr_sleep * transition_factor)
            else:  # Active hours
                noise_value = noise([current_time.timetuple().tm_yday / 365, current_time.hour / 24])
                hr_base = 70 + int((noise_value + 1) * 10)  # Base range [70, 90]
                hr = int(np.random.normal(hr_base, 5))  # Center at hr_base, with a std dev of 5
                hr = np.clip(hr, hr_base - 15, hr_base + 40)  # Clip to desired range

            hr_ts_values.append((1, current_time.strftime('%Y-%m-%d %H:%M:%S'), int(hr)))  # Convert to native int
            current_time += timedelta(minutes=interval_minutes)  # Move to the next interval

    return hr_ts_values


def save_hr_data(hr_ts_values, steps_ts_values):
    cursor = db_connection.cursor()
    query = """
    INSERT INTO DadosDeSaude (NumUtenteSaude, Data, BatCardiaco, Passos)
    VALUES (%s, %s, %s, %s)
    ON DUPLICATE KEY UPDATE
    BatCardiaco = VALUES(BatCardiaco),
    Passos = VALUES(Passos)
    """
    combined_data = {}

    # Insert heart rate data into the combined data dictionary
    for hr_data in hr_ts_values:
        combined_data[hr_data[1]] = [hr_data[0], hr_data[1], hr_data[2], None]

    # Insert Passos data into the combined data dictionary
    for steps_data in steps_ts_values:
        if steps_data[1] in combined_data:
            combined_data[steps_data[1]][3] = steps_data[2]
        else:
            combined_data[steps_data[1]] = [steps_data[0], steps_data[1], None, steps_data[2]]

    # Fill in any None values with 0 for the database
    final_data = [(NumUtenteSaude, Data, BatCardiaco if BatCardiaco is not None else 0, Passos if Passos is not None else 0)
                  for NumUtenteSaude, Data, BatCardiaco, Passos in combined_data.values()]

    cursor.executemany(query, final_data)
    db_connection.commit()
    cursor.close()
    print("Heart rate and Passos data saved successfully!")

def main():
    noise = PerlinNoise(octaves=1)
    start_date = datetime(2023, 7, 1)
    end_date = datetime(2024, 7, 31)
    interval_minutes = 10
    hr_ts_values = generate_hr_ts(start_date, end_date, interval_minutes, noise)
    steps_ts_values = generate_steps(start_date, end_date)

    # Create table if not exists
    create_table()

    # Save HR and steps data to the database
    save_hr_data(hr_ts_values, steps_ts_values)

if __name__ == "__main__":
    main()

    # Close the database connection
    db_connection.close()
