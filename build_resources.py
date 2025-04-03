import pandas as pd
import json
from geopy.geocoders import Nominatim
import time
import re

# Load data
cooling_df = pd.read_csv("Cool It NYC 2020 Cooling Sites.csv")
legal_df = pd.read_csv("NYC Aging All Contracted Providers Apr 2025.csv")
advocacy_df = pd.read_csv("ENDGBV Outreach Campaigns 2018-2019.csv")

geolocator = Nominatim(user_agent="cooling-centers-mapper")

def extract_zip(address):
    match = re.search(r"\b\d{5}\b", address)
    return match.group(0) if match else None

# --- Cooling Centers ---
cooling_df = cooling_df[cooling_df["Borough"].isin(["Manhattan", "Brooklyn"])].copy()

cooling_data = {}
for _, row in cooling_df.iterrows():
    try:
        location = geolocator.reverse((row["y"], row["x"]), timeout=10)
        address = location.address if location else "Unknown"
    except:
        address = "Unknown"

    zip_code = extract_zip(address)
    entry = {
        "name": f"{row['FeatureType']} - {row['PropertyName']}",
        "address": address,
        "phone": "Unknown"
    }

    if zip_code:
        cooling_data.setdefault(zip_code, []).append(entry)
    time.sleep(1)

# --- Legal Aid Clinics ---
legal_df = legal_df[legal_df["Borough"].str.upper().isin(["MANHATTAN", "BROOKLYN"])]

legal_data = {}
for _, row in legal_df.iterrows():
    zip_code = str(row["Postcode"])
    entry = {
        "name": row["ProgramName"],
        "address": f"{row['ProgramAddress']}, {row['ProgramCity']}, NY {zip_code}",
        "phone": row["ProgramPhone"]
    }
    legal_data.setdefault(zip_code, []).append(entry)

# --- Advocacy ZIPs ---
advocacy_data = {
    str(int(row["Zip Codes"])).zfill(5): [{
        "name": "ENDGBV Campaign Activity",
        "address": "N/A",
        "phone": "N/A"
    }]
    for _, row in advocacy_df[advocacy_df["Outreach Events"] > 0].iterrows()
    if 10001 <= row["Zip Codes"] <= 11697
}

# --- Combine by ZIP ---
all_zips = set(cooling_data) | set(legal_data) | set(advocacy_data)

final_json = {
    zip_code: {
        "Cooling Centers": cooling_data.get(zip_code, []),
        "Legal Aid Clinics": legal_data.get(zip_code, []),
        "Advocacy Organizations": advocacy_data.get(zip_code, [])
    }
    for zip_code in sorted(all_zips)
}

# --- Export
with open("community_resources_by_zip.json", "w") as f:
    json.dump(final_json, f, indent=2)

print("✅ Finished! Output saved to community_resources_by_zip.json")
